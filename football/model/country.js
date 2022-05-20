import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    defaul: "",
  },
  league: {
    type: String,
    default: "",
  },
  team: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
});

export const Country = mongoose.model("Country", countrySchema);
