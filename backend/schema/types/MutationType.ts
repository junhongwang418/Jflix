import {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList, GraphQLID} from "graphql";
import MovieType from "./MovieType";
import Movie from "../../models/Movie";
import MovieGenreType from "./MovieGenreType";
import MovieGenre from "../../models/MovieGenre";
import Series from "../../models/Series";
import SeriesGenre from "../../models/SeriesGenre";
import MaturityRating from "../../models/MaturityRating";
import MaturityRatingType from "./MaturityRatingType";
import SeriesType from "./SeriesType";
import SeriesGenreType from "./SeriesGenreType";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        released_year: { type: new GraphQLNonNull(GraphQLInt) },
        maturity_rating_id: { type: GraphQLID },
        genre_ids: { type: new GraphQLList(GraphQLID) }
      },
      resolve: async (parentValue, args) => {
        const {
          title,
          description,
          released_year,
          maturity_rating_id,
          genre_ids
        } = args;

        const movie = new Movie({
          title,
          description,
          released_year,
          maturity_rating_id,
          genre_ids
        });

        const savedMovie = await movie.save();

        // const maturityRating = await MaturityRating.findById(savedMovie.maturity_rating_id);
        // maturityRating.movie_ids.push(savedMovie._id);
        // await maturityRating.save();

        // const genres = await MovieGenre.find({
        //   _id: { $in: savedMovie.genre_ids }
        // });
        // genres.forEach(genre => genre.movie_ids.push(savedMovie._id));
        // await Promise.all(genres.map(genre => genre.save()));

        return savedMovie;
      }
    },

    addMovieGenre: {
      type: MovieGenreType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parentValue, args) => {
        const { name } = args;
        const genre = new MovieGenre({
          name,
          movie_ids: []
        });
        return await genre.save();
      }
    },

    addMaturityRating: {
      type: MaturityRatingType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parentValue, args) => {
        const { name } = args;
        const rating = new MaturityRating({
          name,
          movie_ids: [],
          series_ids: []
        });

        return await rating.save();
      }
    },

    addSeries: {
      type: SeriesType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        released_year: { type: new GraphQLNonNull(GraphQLString) },
        maturity_rating_id: { type: new GraphQLNonNull(GraphQLID) },
        genre_ids: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
      },
      resolve: async (parentValue, args) => {
        const {
          title,
          description,
          released_year,
          maturity_rating_id,
          genre_ids
        } = args;

        const series = new Series({
          title,
          description,
          released_year,
          maturity_rating_id,
          genre_ids
        });

        const savedSeries = await series.save();

        const maturityRating = await MaturityRating.findById(savedSeries.maturity_rating_id);
        maturityRating.series_ids.push(savedSeries._id);
        await maturityRating.save();

        const genres = await SeriesGenre.find({
          _id: { $in: savedSeries.genre_ids }
        });
        genres.forEach(genre => genre.series_ids.push(savedSeries._id));
        await Promise.all(genres.map(genre => genre.save()));

        return savedSeries;

      }
    },

    addSeriesGenre: {
      type: SeriesGenreType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parentValue, args) => {
        const { name } = args;
        const genre = new SeriesGenre({
          name,
          series_ids: []
        });

        return await genre.save();
      }
    }
  })
});

export default MutationType;
