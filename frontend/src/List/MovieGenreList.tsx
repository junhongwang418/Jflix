import React from "react";
import {Typography} from "@material-ui/core";
import { Query } from 'react-apollo';
import {GetAllMovieGenresQuery, GetAllMovieGenresQueryData} from "../Query/GetAllMovieGenresQuery";

class MovieGenreList extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h5" color="textPrimary">Movie Genre List</Typography>
        <Query<GetAllMovieGenresQueryData, {}> query={GetAllMovieGenresQuery}>
          {({ loading, error, data }) => {

            if (loading) {
              return <div>Loading...</div>
            }

            if (error) {
              return <div>Error: Failed to fetch data</div>
            }

            return (
              <ul>
                {
                  data.genres.map(genre =>
                    <li key={genre._id}>
                      <Typography color="textPrimary" gutterBottom>
                        {genre.name}
                      </Typography>
                    </li>
                  )
                }
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default MovieGenreList;
