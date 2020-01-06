import mongoose, { Document } from "mongoose";

export interface ISeries extends Document {
  title: string;
  description: string;
  released_year: string;
  maturity_rating_id: string;
  genre_ids: [string];
  image: string;
}

const SeriesSchema = new mongoose.Schema({
  title: String,
  description: String,
  released_year: Number,
  maturity_rating_id: String,
  genre_ids: [String],
  image: String
});

const Series = mongoose.model<ISeries>("Series", SeriesSchema);

export default Series;
