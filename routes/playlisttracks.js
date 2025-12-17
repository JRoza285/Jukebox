import express from "express";
import { getTracksInPlaylist, createPlaylistTrack } from "../queries/playlisttracks.js";

const router = express.Router();

// GET /playlists/:id/tracks
router.get("/:id/tracks", async (req, res, next) => {
  try {
    const tracks = await getTracksInPlaylist(Number(req.params.id));
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

// POST /playlists/:id/tracks
router.post("/:id/tracks", async (req, res, next) => {
  try {
    const playlistId = Number(req.params.id);
    const { trackId } = req.body;
    const playlistTrack = await createPlaylistTrack(playlistId, trackId);
    res.status(201).json(playlistTrack);
  } catch (err) {
    next(err);
  }
});

export default router;
