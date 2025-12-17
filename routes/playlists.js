import express from "express";
import { getPlaylists, createPlaylist, getPlaylistById } from "../queries/playlists.js";

const router = express.Router();

// GET /playlists
router.get("/", async (req, res, next) => {
  try {
    const playlists = await getPlaylists();
    res.json(playlists);
  } catch (err) {
    next(err);
  }
});

// POST /playlists
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const playlist = await createPlaylist(name, description);
    res.status(201).json(playlist);
  } catch (err) {
    next(err);
  }
});

// GET /playlists/:id
router.get("/:id", async (req, res, next) => {
  try {
    const playlist = await getPlaylistById(Number(req.params.id));
    if (!playlist) return res.status(404).send("Playlist not found");
    res.json(playlist);
  } catch (err) {
    next(err);
  }
});

export default router;
