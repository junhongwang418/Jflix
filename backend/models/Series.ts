import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema({
  title: String,
  description: String,
  released_year: Number,
  maturity_rating_id: String,
  genre_ids: [String]
});

const Series = mongoose.model("Series", SeriesSchema);

export default Series;
