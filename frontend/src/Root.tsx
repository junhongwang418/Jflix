import React from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import MovieList from "./MovieList";
import MovieForm from "./MovieForm";

const client = new ApolloClient({});

class Root extends React.Component {
  render() {

    return (
      <ApolloProvider client={client}>
        <h1>Jflix</h1>
        <MovieList />
        <MovieForm />
      </ApolloProvider>
    );
  }
}

export default Root;
