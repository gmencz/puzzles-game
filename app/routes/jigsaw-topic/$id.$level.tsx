import { json, LoaderFunction, useLoaderData } from "remix";
import { JigsawPuzzle } from "~/components/jigsaw-puzzle";
import { requireUserId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

enum ThrownResponseCode {
  TopicNotFound = "not_found",
}

type LoaderData = {
  level: {
    id: string;
    cols: number;
    imageURL: string;
    number: number;
    rows: number;
  };
};

export let loader: LoaderFunction = async ({ request, params }) => {
  let userId = await requireUserId(request);
  let level = await db.jigsawPuzzleLevel.findUnique({
    where: { id: params.level },
  });

  if (!level) {
    throw json({ code: ThrownResponseCode.TopicNotFound }, { status: 404 });
  }

  let { id, cols, imageURL, number, rows } = level;

  return json({
    level: {
      id,
      cols,
      imageURL,
      number,
      rows,
    },
  });
};

export default function LevelView() {
  let data = useLoaderData<LoaderData>();

  return (
    <div className="h-full relative p-6">
      <JigsawPuzzle
        imageSrc={data.level.imageURL}
        rows={data.level.rows}
        columns={data.level.cols}
      />
    </div>
  );
}
