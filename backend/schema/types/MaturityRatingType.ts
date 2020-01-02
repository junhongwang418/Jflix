import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import MovieType from "./MovieType";
import SeriesType from "./SeriesType";
import Movie from "../../models/Movie";

const MaturityRatingType = new GraphQLObjectType({
  name: "MaturityRating",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async (parentValue, args) => {
        return await Movie.find({
          _id: { $in: parentValue.movie_ids }
        });
      }
    },
    series: {
      type: new GraphQLList(SeriesType),
      resolve: async (parentValue, args) => {
        return await Movie.find({
          _id: { $in: parentValue.series_ids }
        });
      }
    }
  })
});

export default MaturityRatingType;
