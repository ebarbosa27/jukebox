import { createPlaylist, getPlaylistById, getPlaylists } from "#db/queries/playlists";
import { getTracksInPlaylist } from "#db/queries/playlists_tracks";
import express from "express";
const router = express.Router();
export default router;

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    const playlistData = req.body;
    if (!playlistData || !playlistData.name || !playlistData.description) {
      return res.status(400).send("Data from the body is missing! :(");
    }
    const playlist = await createPlaylist(playlistData);
    res.status(201).send(playlist);
  });

router.route("/:id").get(async (req, res) => {
  const playlistId = req.params.id;
  if (isNaN(playlistId)) return res.status(400).send("Id not a number.");

  const playlist = await getPlaylistById(playlistId);
  if (!playlist) return res.status(404).send("Playlist not found :(");

  res.send(playlist);
});

router.route("/:id/tracks").get(async (req, res) => {
  const playlistId = req.params.id;
  if (isNaN(playlistId)) return res.status(400).send("Id not a number.");

  const tracks = await getTracksInPlaylist(playlistId);
  console.log(tracks);
  if (!tracks) return res.status(404).send("Playlist not found :(");

  res.send(tracks);
});
