import mongoose from "mongoose";

const MaturityRatingSchema = new mongoose.Schema({
  name: String,
  movie_ids: [String],
  series_ids: [String]
});

const MaturityRating = mongoose.model("MaturityRating", MaturityRatingSchema);

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
