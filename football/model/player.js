import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const playerSchema = new mongoose.Schema({
  player: {
    name: {
      type: String,
    },
    jerseyNumber: {
      type: Number,
    },
    position: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    height: {
      type: Number,
    },
    foot: {
      type: String,
    },
    joined: {
      type: String,
    },
    contractExpires: {
      type: String,
    },
    marketValue: {
      type: Number,
    },
    country: {
      type: String,
    },
  },
});

export const Player = mongoose.model("Player", playerSchema);
