// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function populate() {
  // creating cameras
  const [camera1, camera2, camera3] = await Promise.all([
    prisma.camera.create({
      data: { name: "Shop Floor A", location: "Ground Floor" },
    }),
    prisma.camera.create({ data: { name: "Vault", location: "Basement" } }),
    prisma.camera.create({
      data: { name: "Entrance", location: "Main Entrance" },
    }),
  ]);

  const cameras = [camera1, camera2, camera3];

  const types = [
    [
      "Unauthorized Access",
      "Gun Threat",
      "Face Recognised",
      "Unauthorized Access",
    ], // Shop Floor A
    ["Face Recognised", "Gun Threat", "Unauthorized Access", "Gun Threat"], // Vault
    ["Gun Threat", "Face Recognised", "Unauthorized Access", "Face Recognised"], // Entrance
  ];

  const thumbnails = [
    [
      "unauthorized_access1.jpg",
      "gun1.jpg",
      "face1.jpg",
      "unauthorized_access2.jpg",
    ], // Shop Floor A
    ["face2.jpg", "gun2.jpg", "unauthorized_access3.jpg", "gun3.jpg"], // Vault
    ["gun4.jpg", "face3.jpg", "unauthorized_access4.jpg", "face4.jpg"], // Entrance
  ];

  //base time
  const start = new Date("2025-07-21T10:00:00Z");

  for (let c = 0; c < cameras.length; c++) {
    for (let i = 0; i < 4; i++) {
      await prisma.incident.create({
        data: {
          cameraId: cameras[c].id,
          type: types[c][i],
          tsStart: new Date(start.getTime() + i * 2 * 60 * 60 * 1000),
          tsEnd: new Date(
            start.getTime() + i * 2 * 60 * 60 * 1000 + 15 * 60 * 1000
          ),
          thumbnailUrl: `/thumbnails/${thumbnails[c][i]}`,
          resolved: false,
        },
      });
    }
  }
}

populate()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
