import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const db = new PrismaClient();

async function seed() {
  await db.user.create({
    data: {
      email: "yo@gabrielmendezc.com",
      password: await hash("password", 12),
    },
  });

  let spainTopic = await db.jigsawPuzzlesTopic.create({
    data: {
      name: "Spain",
    },
  });

  await db.jigsawPuzzleLevel.createMany({
    data: [
      {
        number: 1,
        cols: 3,
        rows: 3,
        topicId: spainTopic.id,
        imageURL:
          "https://res.cloudinary.com/ds9ttumx0/image/upload/v1639331456/puzzles-game/Spain/beach-g246236923_1920_1_v75jfq.jpg",
      },
    ],
  });
}

seed().catch(console.error);
