import mongoose from "mongoose";

const MovieGenreSchema = new mongoose.Schema({
  name: String,
  movie_ids: [String]
});

const MovieGenre = mongoose.model("MovieGenre", MovieGenreSchema);

export default MovieGenre;

const movieGenreNames = [
  "Thriller",
  "Psychological Thrillers",
  "Crime Thrillers",
  "Sci-Fi Thrillers",
  "Teen Movies",
  "Japanese Movies",
  "Drama Anime",
  "Anime Features",
  "Action & Adventure",
  "Action Thrillers",
  "Sci-Fi & Fantasy",
  "Adventures",
  "Action Sci-Fi & Fantasy",
  "Horror Movies",
  "Sci-Fi Horror Movies",
  "Creature Features",
  "Dramas",
  "Crime Dramas"
];

export { movieGenreNames };
