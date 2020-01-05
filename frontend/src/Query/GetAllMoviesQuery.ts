import {gql} from "apollo-boost";

export const GetAllMoviesQuery = gql`
  query {
    movies: getAllMovies {
      _id
      title
      description
      released_year
    }
  }
`;

export interface GetAllMoviesQueryData {
  movies: Array<{
    _id: string;
    title: string;
    description: string;
    released_year: number;
  }>;
}
