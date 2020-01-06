import mongoose, { Document }  from "mongoose";

export interface ISeriesGenre extends Document {
  name: string;
  series_ids: [string];
}
const SeriesGenreSchema = new mongoose.Schema({
  name: String,
  series_ids: [String]
});

const SeriesGenre = mongoose.model<ISeriesGenre>("SeriesGenre", SeriesGenreSchema);

export default SeriesGenre;
