import {gql} from "apollo-boost";

export const GetAllMovieGenresQuery = gql`
  query {
    genres: getAllMovieGenres {
      _id
      name
    }
  }
`;

export interface GetAllMovieGenresQueryData {
  genres: Array<{
    _id: string;
    name: string;
  }>;
}
