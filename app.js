import express from "express";
import morgan from "morgan";
import tracksRouter from "#api/tracks";
import playlistsRouter from "./routes/playlists.js";
import playlisttracksRouter from "./routes/playlisttracks.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//uses routers for individual files

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
app.use("/playlists/:id/tracks", playlisttracksRouter);


//handels postgres errors

app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }

  if (err.code === "") {
    return res.status(400).send(err.detail);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;
