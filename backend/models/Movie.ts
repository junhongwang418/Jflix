import mongoose, { Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  description: string;
  released_year: string;
  maturity_rating_id: string;
  genre_ids: [string];
  image: string;
}

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  released_year: Number,
  maturity_rating_id: String,
  genre_ids: [String],
  image: String
});

const Movie = mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;
