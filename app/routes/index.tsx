import { Prisma } from "@prisma/client";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { requireUserId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

type LoaderData = {
  episode: {
    id: string;
    name: string;
    levels: {
      number: number;
      id: string;
      cols: number;
      imageURL: string;
      rows: number;
    }[];
  };

  highestLevelPlayedNumber?: number;
};

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await requireUserId(request);

  let highestLevelPlayedState = await db.levelState.findFirst({
    where: {
      userId: { equals: userId },
    },
    orderBy: [
      { level: { episode: { number: "desc" } } },
      { level: { number: "desc" } },
    ],
    select: {
      level: {
        select: {
          number: true,
        },
      },
      levelId: true,
    },
    take: 1,
  });

  let episodeSelect: Prisma.EpisodeSelect = {
    id: true,
    name: true,
    number: true,
    levels: {
      select: {
        id: true,
        cols: true,
        number: true,
        rows: true,
      },
    },
  };

  // If the user doesn't have a highest level played, this means that they are new to the game.
  if (!highestLevelPlayedState) {
    // Find the first episode of the game.
    let episode = await db.episode.findUnique({
      where: {
        number: 1,
      },
      select: episodeSelect,
    });

    // If there's no first episode in the game, then something's wrong and we can't continue.
    if (!episode) {
      throw new Response("Internal Server Error", { status: 500 });
    }

    return json({ episode });
  }

  let episode = await db.episode.findFirst({
    where: {
      levels: { some: { id: { equals: highestLevelPlayedState.levelId } } },
    },
    select: episodeSelect,
  });

  return json({
    episode,
    highestLevelPlayedNumber: highestLevelPlayedState.level.number,
  });
};

export default function TopicsView() {
  let data = useLoaderData<LoaderData>();
  let encodedEpisodeName = encodeURI(data.episode.name);

  console.log({ data });

  return (
    <div className="h-full relative p-6 bg-[#0353C0] flex flex-col items-center">
      <div className="mt-12 bg-[#01214D] p-12 max-w-md w-full mx-auto rounded-xl flex items-center justify-center text-center relative z-10">
        <h1 className="text-white text-4xl">{data.episode.name}</h1>
      </div>

      {data.episode.levels.map((level) => (
        <div
          key={level.id}
          className="flex flex-col items-center -mt-1 text-[#01214D]"
        >
          <div className="h-12 w-4 bg-white" />
          {data.highestLevelPlayedNumber ? (
            level.number > data.highestLevelPlayedNumber ? (
              <div className="h-14 w-14 text-2xl bg-white rounded-full -mt-1 flex items-center justify-center text-center ring-2 ring-[#01214D] relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            ) : (
              <Link
                to={`/${encodedEpisodeName}/${level.number}`}
                className="h-14 hover:scale-110 w-14 text-2xl bg-white rounded-full -mt-1 flex items-center justify-center text-center ring-2 ring-[#01214D] relative z-10"
              >
                {level.number}
              </Link>
            )
          ) : level.number !== 1 ? (
            <div className="h-14 w-14 text-2xl bg-white rounded-full -mt-1 flex items-center justify-center text-center ring-2 ring-[#01214D] relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          ) : (
            <Link
              to={`/${encodedEpisodeName}/${level.number}`}
              className="h-14 hover:scale-110 w-14 text-2xl bg-white rounded-full -mt-1 flex items-center justify-center text-center ring-2 ring-[#01214D] relative z-10"
            >
              {level.number}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
