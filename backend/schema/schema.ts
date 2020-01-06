import {GraphQLSchema} from "graphql";
import RootQueryType from "./types/RootQueryType";
import MutationType from "./types/MutationType";

export default new GraphQLSchema({
  query: RootQueryType,
  // mutation: MutationType
})
