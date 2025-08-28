import { createPlaylist, getPlaylistById, getPlaylists } from "#db/queries/playlists";
import { createPlaylistTrack, getTracksInPlaylist } from "#db/queries/playlists_tracks";
import { getTrackById } from "#db/queries/tracks";
import requireBody from "#middleware/requireBody";
import express from "express";
const router = express.Router();
export default router;

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(requireBody(["name", "description"]), async (req, res) => {
    const playlistData = req.body;
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

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const playlistId = req.params.id;
    if (isNaN(playlistId)) return res.status(400).send("Id not a number.");

    const tracks = await getTracksInPlaylist(playlistId);
    if (tracks.length === 0) return res.status(404).send("Playlist not found :(");

    res.send(tracks);
  })
  .post(requireBody(["trackId"]), async (req, res) => {
    const playlistId = req.params.id;
    const trackId = req.body.trackId;

    const track = await getTrackById(trackId);
    if (isNaN(trackId)) return res.status(400).send("trackId is not a number!");
    if (!track) return res.status(400).send("Track not found!");

    const playlist = await getPlaylistById(playlistId);
    if (isNaN(playlistId)) return res.status(400).send("playlistId is not a number!");
    if (!playlist) return res.status(404).send("Playlist not found!");

    const playlist_track = await createPlaylistTrack({
      playlist_id: playlistId,
      track_id: trackId,
    });
    if (!playlist_track) return res.status(404).send("Playlist not found :(");

    res.status(201).send(playlist_track);
  });
