import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const db = new PrismaClient();

async function seed() {
  let user = await db.user.create({
    data: {
      email: "yo@gabrielmendezc.com",
      password: await hash("password", 12),
    },
  });

  let episode = await db.episode.create({
    data: {
      number: 1,
      name: "First Light",
    },
  });

  let level1 = await db.level.create({
    data: {
      number: 1,
      cols: 3,
      rows: 3,
      episodeId: episode.id,
      imageURL:
        "https://res.cloudinary.com/ds9ttumx0/image/upload/v1639418550/Puzzles%20Game/table-setting-g254bf433b_1920_cttvzw.jpg",
    },
  });

  let level2 = await db.level.create({
    data: {
      number: 2,
      cols: 4,
      rows: 4,
      episodeId: episode.id,
      imageURL:
        "https://res.cloudinary.com/ds9ttumx0/image/upload/v1639418514/Puzzles%20Game/animal-g99c2db76d_1920_vqjvoq.jpg",
    },
  });

  await db.levelState.create({
    data: {
      userId: user.id,
      levelId: level1.id,
    },
  });
}

seed().catch(console.error);
