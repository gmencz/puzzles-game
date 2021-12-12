import type { JigsawPuzzleLevel, JigsawPuzzlesTopic } from "@prisma/client";
import type { LoaderFunction, ThrownResponse } from "remix";
import { json, useLoaderData } from "remix";
import { requireUserId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

type LoaderData = {
  topic: {
    id: string;
    name: string;
    levels: {
      completed: boolean;
      id: string;
      number: number;
      imageURL: string;
      rows: number;
      cols: number;
      topicId: string;
    }[];
  };
};

enum ThrownResponseCode {
  NotAllRequiredTopicsAreCompleted = "not_all_required_topics_are_completed",
  TopicNotFound = "not_found",
}

type NotAllRequiredTopicsAreCompletedData = {
  code: ThrownResponseCode.NotAllRequiredTopicsAreCompleted;
  requiredTopicCompletions: {
    completed: boolean;
    id: string;
    name: string;
  }[];
};

type TopicNotFoundData = {
  code: ThrownResponseCode.TopicNotFound;
};

type ThrownResponseData =
  | NotAllRequiredTopicsAreCompletedData
  | TopicNotFoundData;

type TopicNotFoundResponse = ThrownResponse<404, ThrownResponseData>;

export let loader: LoaderFunction = async ({ request, params }) => {
  let userId = await requireUserId(request);
  let topic = await db.jigsawPuzzlesTopic.findUnique({
    where: {
      id: params.id,
    },
    include: {
      jigsawPuzzleLevels: true,
      requiredTopicCompletions: true,
    },
  });

  if (topic?.requiredTopicCompletions.length) {
    let requiredCompletedTopics = await db.jigsawPuzzlesTopic.findMany({
      where: {
        AND: [
          {
            jigsawPuzzleLevels: {
              every: {
                completions: {
                  some: {
                    userId: { equals: userId },
                  },
                },
              },
            },
          },

          {
            id: { in: topic.requiredTopicCompletions.map((t) => t.id) },
          },
        ],
      },

      select: {
        id: true,
        name: true,
      },
    });

    let hasCompletedRequiredTopics =
      requiredCompletedTopics.length === topic.requiredTopicCompletions.length;

    if (!hasCompletedRequiredTopics) {
      throw json(
        {
          code: ThrownResponseCode.NotAllRequiredTopicsAreCompleted,
          requiredTopicCompletions: topic.requiredTopicCompletions.map(
            (topic) => ({
              ...topic,
              completed: requiredCompletedTopics.some(
                ({ id }) => id === topic.id
              ),
            })
          ),
        },
        { status: 400 }
      );
    }
  }

  if (!topic) {
    throw json({ code: ThrownResponseCode.TopicNotFound }, { status: 404 });
  }

  let completedLevels = await db.jigsawPuzzleLevelCompletions.findMany({
    where: {
      AND: [
        { userId: { equals: userId } },
        { jigsawPuzzleLevel: { topicId: { equals: topic.id } } },
      ],
    },
  });

  return json({
    topic: {
      id: topic.id,
      name: topic.name,
      levels: topic.jigsawPuzzleLevels.map((level) => {
        return {
          ...level,
          completed: completedLevels.some(
            ({ jigsawPuzzleLevelId }) => level.id === jigsawPuzzleLevelId
          ),
        };
      }),
    },
  });
};

export default function JigsawTopicView() {
  let data = useLoaderData<LoaderData>();
  console.log(data);

  return (
    <div className="h-full relative p-6">
      <h1 className="mb-4 text-lg font-semibold">{data.topic.name}</h1>

      {data.topic.levels.map((level) => (
        <a
          key={level.id}
          className="bg-gray-600 text-white p-4 flex"
          href={`/jigsaw-topic/${data.topic.id}/${level.id}`}
        >
          {level.number} - {level.completed ? "Completed" : "Not completed"}
        </a>
      ))}
    </div>
  );
}
