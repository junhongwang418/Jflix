import {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID} from "graphql";
import SeriesType from "./SeriesType";
import Series from "../../models/Series";
import {ISeriesGenre} from "../../models/SeriesGenre";


const SeriesGenreType: GraphQLObjectType = new GraphQLObjectType<ISeriesGenre>({
  name: "SeriesGenre",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    series: {
      type: new GraphQLList(SeriesType),
      resolve: async (parentValue, args) => {
        return await Series.find({
          _id: { $in: parentValue.series_ids }
        });
      }
    }
  })
});

export default SeriesGenreType;
