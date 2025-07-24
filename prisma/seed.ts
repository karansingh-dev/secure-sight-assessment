// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function populate() {
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

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
    ],
    ["Face Recognised", "Gun Threat", "Unauthorized Access", "Gun Threat"],
    ["Gun Threat", "Face Recognised", "Unauthorized Access", "Face Recognised"],
  ];

  const thumbnails = [
    [
      "unauthorized_access1.jpg",
      "gun1.jpg",
      "face1.jpg",
      "unauthorized_access2.jpg",
    ],
    ["face2.jpg", "gun2.jpg", "unauthorized_access3.jpg", "gun3.jpg"],
    ["gun4.jpg", "face3.jpg", "unauthorized_access4.jpg", "face4.jpg"],
  ];

  const base = new Date(Date.UTC(2025, 6, 21, 0, 0, 0));

  function getRandomHour(exclude: number[], buffer = 1): number {
    let hour: number;
    let attempts = 0;
    do {
      hour = Math.floor(Math.random() * (24 - buffer));
      attempts++;
      if (attempts > 100) break;
    } while (exclude.some((used) => Math.abs(used - hour) < buffer));
    return hour;
  }

  for (let c = 0; c < cameras.length; c++) {
    const usedHours: number[] = [];
    for (let i = 0; i < 4; i++) {
      const hour = getRandomHour(usedHours);
      usedHours.push(hour);

      const startTime = new Date(base.getTime());
      startTime.setUTCHours(hour);
      startTime.setUTCMinutes(Math.floor(Math.random() * 60));
      startTime.setUTCSeconds(0);
      startTime.setUTCMilliseconds(0);

      // 15 min duration
      const endTime = new Date(startTime.getTime() + 15 * 60 * 1000);

      await prisma.incident.create({
        data: {
          cameraId: cameras[c].id,
          type: types[c][i],
          tsStart: startTime,
          tsEnd: endTime,
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
    console.error("failed to populate database", e);
    await prisma.$disconnect();
    process.exit(1);
  });
