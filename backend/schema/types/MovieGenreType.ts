import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import MovieType from "./MovieType";
import Movie from "../../models/Movie";

const MovieGenreType = new GraphQLObjectType({
  name: "MovieGenre",
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
    }
  })
});

export default MovieGenreType;
