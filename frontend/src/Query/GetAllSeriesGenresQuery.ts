import {gql} from "apollo-boost";

export const GetAllSeriesGenresQuery = gql`
  query {
    genres: getAllSeriesGenres {
      _id
      name
    }
  }
`;

export interface GetAllSeriesGenresQueryData {
  genres: Array<{
    _id: string;
    name: string;
  }>;
}
