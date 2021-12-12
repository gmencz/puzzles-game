import { JigsawPuzzle } from "~/components/jigsaw-puzzle";

export default function Index() {
  let imageSrc =
    "https://images.ctfassets.net/j95d1p8hsuun/29peK2k7Ic6FsPAVjHWs8W/06d3add40b23b20bbff215f6979267e8/NW_OPENGRAPH_1200x630.jpg";

  return (
    <div className="h-full relative p-6">
      <img className="top-0 left-0 w-[600px]" src={imageSrc} alt="New World" />

      <div className="mt-12 relative">
        <JigsawPuzzle
          imageSrc={imageSrc}
          rows={2}
          columns={2}
          onSolved={() => alert("Solved!")}
        />
      </div>
    </div>
  );
}
