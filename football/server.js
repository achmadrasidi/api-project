import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { eurofotbal, soccerway, transfermarkt } from "soccerbot";
import migrate from "./migrate.js";
import { Country } from "./model/country.js";
import { League } from "./model/league.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createTeam = async (country, name, id) => {
  const countries = await Country.find({ league: name });

  if (countries.length === 0) {
    const league = await transfermarkt.league(id);
    const team = await Country.create({ country, league: name, team: league.data });
    if (!team) {
      return undefined;
    }
    return team;
  }
};

const createPlayer = async (league, name, id) => {
  const countries = await League.find({ team: name });

  if (countries.length === 0) {
    const team = await transfermarkt.team(id);
    const plyr = await League.create({ league, team: name, player: team.data });
    if (!team) {
      return undefined;
    }
    return plyr;
  }
};

const getFilterCountry = async (country) => {
  if (!country) {
    return undefined;
  }

  let league = await Country.find({ country }, { _id: 0 });
  if (league.length === 0) {
    return undefined;
  }

  return league;
};

const getFilterLeague = async (league) => {
  if (!league) {
    return undefined;
  }

  let team = await Country.find({ league }, { _id: 0 });
  if (team.length === 0) {
    return undefined;
  }

  return team;
};

const getAllTeam = async () => {
  const league = await Country.find({}, { _id: 0 });
  if (league.length === 0) {
    return undefined;
  }
  return league;
};

const getAllPlayer = async () => {
  const player = await League.find({}, { _id: 0 });
  if (!player) {
    return undefined;
  }
  return player;
};

app.get("/", (req, res) => {
  res.json("this is a football data api");
});

// app.use("/api/migrate", migrate);

app.post("/api/team", async (req, res) => {
  const { country, name, id } = req.body;
  const league = await createTeam(country, name, id);
  if (!league) {
    res.json({ error: "cannot create team API" });
    return;
  }

  res.json(league);
});

app.post("/api/player", async (req, res) => {
  const { league, team, id } = req.body;
  const player = await createPlayer(league, team, id);
  if (!player) {
    res.json({ error: "cannot create player API" });
    return;
  }

  res.json(player);
});

app.get("/api/team", async (req, res) => {
  const { country, league, team, player, id } = req.query;
  let football = {};

  if (!country && !league && !player) {
    football = await getAllTeam();
  } else if (country) {
    football = await getFilterCountry(country);
  } else if (league) {
    football = await getFilterLeague(league);
  }

  res.json({ Data: football, player });
});

app.get("/api/player", async (req, res) => {
  const { league, team, player } = req.query;
  let football = await getAllPlayer();
  res.json({ Data: football });
});

app.listen(port, () => {
  console.log(`your app is listening on port ${port}`);
});
