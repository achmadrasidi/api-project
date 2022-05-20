import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { getAll, getMovie, getTvShow } from "./controllers.js";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.get("/", (_req, res) => {
  res.send("Welcome to stream update movies API");
});

app.get("/api/films", async (req, res) => {
  const { type } = req.query;
  let movie;

  switch (type) {
    case "movies":
      movie = await getMovie();
      break;
    case "tvshows":
      movie = await getTvShow();
      break;
    default:
      movie = await getAll();
  }

  if (!movie) {
    res.json({ error: "cannot get movie", status: "closed" });
    return;
  }
  res.json(movie);
});

app.listen(port, () => {
  console.log(`your app is listening on port ${port}`);
});
