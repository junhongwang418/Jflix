import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema";
import webpackMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "../webpack.config";

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

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(process.env.PORT || 80, () => {
  console.log(`Listening to port ${process.env.PORT || 80}`);
});
