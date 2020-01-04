import {gql} from "apollo-boost";

export const GetAllMoviesQuery = gql`
  query {
    movies: getAllMovies {
      title
      description
      released_year
    }
  }
`;

export interface GetAllMoviesQueryData {
  movies: Array<{
    title: string;
    description: string;
    released_year: number;
  }>;
}
