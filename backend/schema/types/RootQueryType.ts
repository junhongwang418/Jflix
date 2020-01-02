import {GraphQLID, GraphQLList, GraphQLObjectType} from "graphql";
import MovieType from "./MovieType";
import Movie from "../../models/Movie";
import SeriesType from "./SeriesType";
import Series from "../../models/Series";
import MovieGenreType from "./MovieGenreType";
import MovieGenre from "../../models/MovieGenre";
import SeriesGenreType from "./SeriesGenreType";
import SeriesGenre from "../../models/SeriesGenre";
import MaturityRatingType from "./MaturityRatingType";
import MaturityRating from "../../models/MaturityRating";

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    getMovieById: {
      type: MovieType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: async (parentValue, args) => {
        return await Movie.findById(args._id);
      }
    },
    getAllMovies: {
      type: new GraphQLList(MovieType),
      resolve: async (parentValue, args) => {
        return await Movie.find({});
      }
    },
    getSeriesById: {
      type: SeriesType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: async (parentValue, args) => {
        return await Series.findById(args._id);
      }
    },
    getAllSeries: {
      type: new GraphQLList(SeriesType),
      resolve: async (parentValue, args) => {
        return await Series.find({});
      }
    },
    getMovieGenreById: {
      type: MovieGenreType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: async (parentValue, args) => {
        return await MovieGenre.findById(args._id);
      }
    },
    getAllMovieGenres: {
      type: new GraphQLList(MovieGenreType),
      resolve: async (parentValue, args) => {
        return await MovieGenre.find({});
      }
    },
    getSeriesGenreById: {
      type: SeriesGenreType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: async (parentValue, args) => {
        return await SeriesGenre.findById(args._id);
      }
    },
    getAllSeriesGenres: {
      type: new GraphQLList(SeriesGenreType),
      resolve: async (parentValue, args) => {
        return await SeriesGenre.find({});
      }
    },
    getMaturityRatingById: {
      type: MaturityRatingType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: async (parentValue, args) => {
        return await MaturityRating.findById(args._id);
      }
    },
    getAllMaturityRatings: {
      type: new GraphQLList(MaturityRatingType),
      resolve: async (parentValue, args) => {
        return await MaturityRating.find({});
      }
    }
  })
});

export default RootQueryType;
