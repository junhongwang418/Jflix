import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  released_year: Number,
  maturity_rating_id: String,
  genre_ids: [String]
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
