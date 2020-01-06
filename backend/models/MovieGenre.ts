import mongoose, { Document }  from "mongoose";

export interface IMovieGenre extends Document {
  name: string;
  movie_ids: [string];
}
const MovieGenreSchema = new mongoose.Schema({
  name: String,
  movie_ids: [String]
});

const MovieGenre = mongoose.model<IMovieGenre>("MovieGenre", MovieGenreSchema);

export default MovieGenre;
