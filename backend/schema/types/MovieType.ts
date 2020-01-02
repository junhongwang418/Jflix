import {GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import MaturityRatingType from "./MaturityRatingType";
import MaturityRating from "../../models/MaturityRating";
import SeriesGenreType from "./SeriesGenreType";
import SeriesGenre from "../../models/SeriesGenre";
import MovieGenreType from "./MovieGenreType";
import MovieGenre from "../../models/MovieGenre";

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    released_year: { type: GraphQLInt },
    maturity_rating: {
      type: MaturityRatingType,
      resolve: async (parentValue, args) => {
        return MaturityRating.findById(parentValue.maturity_rating_id)
      }
    },
    genres: {
      type: new GraphQLList(MovieGenreType),
      resolve: async (parentValue, args) => {
        return await MovieGenre.find({
          _id: { $in: parentValue.genre_ids }
        });
      }
    }
  })
});

export default MovieType;
