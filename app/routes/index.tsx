import { json, LoaderFunction, useLoaderData } from "remix";
import { requireUserId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

type LoaderData = {
  topics: {
    id: string;
    name: string;
    unlockableByPlaying: boolean;
  }[];
};

export let loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);

  let topics = await db.jigsawPuzzlesTopic.findMany({
    include: {
      requiredTopicCompletions: { take: 1, select: { id: true } },
    },
  });

  return json({
    topics: topics.map((topic) => {
      return {
        id: topic.id,
        name: topic.name,
        unlockableByPlaying: topic.requiredTopicCompletions.length > 0,
      };
    }),
  });
};

export default function TopicsView() {
  let data = useLoaderData<LoaderData>();

  return (
    <div className="h-full relative p-6">
      <h2 className="mb-4 text-lg font-semibold">Jigsaw Puzzles Topics</h2>

      {data.topics.map((topic) => (
        <a
          key={topic.id}
          className="bg-gray-600 text-white p-4 flex"
          href={`/jigsaw-topic/${topic.id}`}
        >
          {topic.name}
        </a>
      ))}
    </div>
  );
}
