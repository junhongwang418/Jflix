import React from "react";
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import {GetAllMoviesQuery, GetAllMoviesQueryData} from "./Query/GetAllMoviesQuery";
import {Typography} from "@material-ui/core";

class MovieList extends React.Component {
  render() {

    return (
      <Query<GetAllMoviesQueryData, {}> query={GetAllMoviesQuery}>
        {({ loading, error, data }) => {

          if (loading) {
            return <div>Loading...</div>
          }

          if (error) {
            return <div>Error: Failed to fetch data</div>
          }

          return (
            <div>
              <Typography variant="h5" color="textPrimary" gutterBottom>Junhong's Favorite Movies</Typography>
              <ul>
                {
                  data.movies.map(movie =>
                    <li>
                      <Typography color="textPrimary" gutterBottom>
                        {movie.title},
                        {movie.description},
                        {movie.released_year}
                      </Typography>
                    </li>
                  )
                }
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MovieList;
