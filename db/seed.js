import db from "#db/client";

import {createPlaylists} from "./queries/playlists.js";
import { createTracks } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlisttracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
console.log("Seeding the database...");

const playlists = [];
const tracks = [];
//ex-plain the 12*5
for (let i = 1; i <= 20; i++) {
  const track = await createTracks(`Track ${i}`,
    12000 + i * 5000
  );
  tracks.push(track);
}

for (let i = 1; i <= 10; i++) {
  const playlist = await createPlaylists(
    `Playlist ${i}`,
    `Description for playlist ${i}`
  );
  console.log(playlist);
  playlists.push(playlist);
}

let count = 0;
while (count < 15) {
  const randomTrack = 
  tracks[Math.floor(Math.random() * tracks.length)];
  const randomPlaylist = 
  playlists[Math.floor(Math.random() * playlists.length)];

console.log("randomPlaylist", randomPlaylist);
console.log("randomTrack", randomTrack);

  const result = await createPlaylistTrack(randomPlaylist.id, randomTrack.id);
  if (result) count++;
}



console.log("Seeding complete!")

}
