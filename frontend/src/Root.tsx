import React from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import MovieList from "./MovieList";
import MovieForm from "./MovieForm";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import {Container} from "@material-ui/core";

const client = new ApolloClient({});

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class Root extends React.Component {
  render() {

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router>
            <NavigationBar />
            <Container maxWidth="xl">
              <Switch>
                <Route exact path="/">
                  <MovieList />
                </Route>
                <Route path="/movies">
                  <MovieList />
                </Route>
                <Route path="/series">
                  <MovieList />
                </Route>
                <Route path="/forms">
                  <MovieForm />
                </Route>
              </Switch>
            </Container>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default Root;
