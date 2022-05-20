import express from "express";
import { Country } from "./model/country.js";
import country from "./data/country.js";
const migrate = express.Router();

migrate.post("/country", async (req, res) => {
  await Country.remove({});
  const migrateCountry = await Country.insertMany(country);
  res.send({ migrateCountry });
});

export default migrate;
