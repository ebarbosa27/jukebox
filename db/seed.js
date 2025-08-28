import db from "#db/client";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const playlistList = [];
  const trackList = [];
  for (let i = 0; i < 15; i++) {
    const playlist = {
      name: faker.animal.petName(),
      description: faker.person.bio,
    };
    playlistList.push(playlist);
  }
  for (let i = 0; i < 30; i++) {
    const track = {
      name: faker.music.songName(),
      duration: faker.number.int({ min: 60000, max: 360000 }),
    };
  }

  for (let i = 0; i < 15 * 30; i++) {
    // 50/50 to add item to track
    const random = Math.ceil(Math.random() * 2);
    if (random === 2) continue;
  }

  console.log();
}
