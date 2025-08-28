import { getTrackById, getTracks } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const trackId = req.params.id;
  if (isNaN(trackId)) return res.status(400).send("Id not a number.");

  const track = await getTrackById(trackId);
  if (!track) return res.status(404).send("Track does not exists!");

  res.send(track);
});
