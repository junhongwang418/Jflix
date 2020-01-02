import express from "express";
// @ts-ignore
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema";

const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log("Connected to database");
});

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
