import mongoose from "mongoose";

const SeriesGenreSchema = new mongoose.Schema({
  name: String,
  series_ids: [String]
});

const SeriesGenre = mongoose.model("SeriesGenre", SeriesGenreSchema);

export default SeriesGenre;

const seriesGenreNames = [
  "Wedding & Romance Reality TV",
  "Japanese TV Shows",
  "Reality TV",
  "Crime TV Dramas",
  "TV Shows Based on Books",
  "TV Thrillers",
  "TV Dramas",
  "Sci-Fi TV",
  "TV Shows Based on Manga",
  "Family Watching Together TV",
  "Teen TV Shows",
  "Korean TV Shows"
];

export { seriesGenreNames };
