import express from "express";
import { getTracks, getTrackById } from "#db/queries/tracks";

const router = express.Router();

// GET /tracks
router.get("/", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

// GET /tracks/:id
router.get("/:id", async (req, res, next) => {
  try {
    const track = await getTrackById(Number(req.params.id));
    if (!track) return res.status(404).send("Track not found");
    res.json(track);
  } catch (err) {
    next(err);
  }
});

export default router;
