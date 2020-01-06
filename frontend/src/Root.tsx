import React from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import MovieList from "./List/MovieList";
import MovieForm from "./Form/MovieForm";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import {Container} from "@material-ui/core";
import MaturityRatingForm from "./Form/MaturityRatingForm";
import MovieGenreForm from "./Form/MovieGenreForm";
import SeriesForm from "./Form/SeriesForm";
import SeriesGenreForm from "./Form/SeriesGenreForm";
import MaturityRatingList from "./List/MaturityRatingList";
import MovieGenreList from "./List/MovieGenreList";
import SeriesList from "./List/SeriesList";
import SeriesGenreList from "./List/SeriesGenreList";

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
                  <SeriesList />
                  <MovieGenreList />
                  <SeriesGenreList />
                  <MaturityRatingList />
                </Route>
                <Route path="/movies">
                  <MovieList />
                </Route>
                <Route path="/series">
                  <SeriesList />
                </Route>
                {/*<Route path="/forms">*/}
                {/*  <MovieForm />*/}
                {/*  <MovieGenreForm />*/}
                {/*  <SeriesForm />*/}
                {/*  <SeriesGenreForm />*/}
                {/*  <MaturityRatingForm />*/}
                {/*</Route>*/}
              </Switch>
            </Container>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default Root;
