import mongoose, { Document }  from "mongoose";

export interface IMaturityRating extends Document {
  name: string;
  movie_ids: [string];
  series_ids: [string];
}

const MaturityRatingSchema = new mongoose.Schema({
  name: String,
  movie_ids: [String],
  series_ids: [String]
});

const MaturityRating = mongoose.model<IMaturityRating>("MaturityRating", MaturityRatingSchema);

export default MaturityRating;

const maturityRatingNames = [
  "G",
  "TV-Y",
  "TV-G",
  "PG",
  "TV-Y7",
  "TV-Y7-FV",
  "TV-PG"
];

export { maturityRatingNames };
