import React from "react";
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import {GetAllMoviesQuery, GetAllMoviesQueryData} from "./Query/GetAllMoviesQuery";

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
              <h2>Movie List</h2>
              <ul>
                {
                  data.movies.map(movie =>
                    <li>
                      {movie.title},
                      {movie.description},
                      {movie.released_year}
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
