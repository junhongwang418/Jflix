import {GraphQLID, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";
import MaturityRatingType from "./MaturityRatingType";
import MaturityRating from "../../models/MaturityRating";
import SeriesGenreType from "./SeriesGenreType";
import SeriesGenre from "../../models/SeriesGenre";

const SeriesType = new GraphQLObjectType({
  name: "Series",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    released_year: { type: GraphQLInt },
    maturity_rating: {
      type: MaturityRatingType,
      resolve: async (parentValue, args) => {
        return MaturityRating.findById(parentValue.maturity_rating_id);
      }
    },
    genres: {
      type: new GraphQLList(SeriesGenreType),
      resolve: async (parentValue, args) => {
        return await SeriesGenre.find({
          _id: { $in: parentValue.genre_ids }
        });
      }
    }
  })
});

export default SeriesType;
