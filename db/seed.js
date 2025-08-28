import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const playlistList = [];
  for (let i = 0; i < 15; i++) {
    // CREATE AND ADD PLAYLIST TO DB
    const playlist = {
      name: faker.animal.petName(),
      description: faker.person.bio,
    };
    const { id: playlist_id } = await createPlaylist(playlist);
    playlistList.push(playlist_id);
  }

  const trackList = [];
  for (let i = 0; i < 30; i++) {
    // CREATE AND ADD TRACK TO DB
    const track = {
      name: faker.music.songName(),
      duration_ms: faker.number.int({ min: 60000, max: 360000 }),
    };
    const { id: track_id } = await createTrack(track);
    trackList.push(track_id);
  }

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 30; j++) {
      // DECIDE AND ADD PLAYLIST_TRACK TO DB
      const random = Math.ceil(Math.random() * 4);
      if (random !== 1) continue;
      await createPlaylistTrack({ playlist_id: playlistList[i], track_id: trackList[j] });
    }
  }
}
