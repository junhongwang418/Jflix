import {gql} from "apollo-boost";

export const GetAllSeriesQuery = gql`
  query {
    series: getAllSeries {
      _id
      title
      description
      released_year
      image
      maturity_rating {
        _id
        name
      }
      genres {
        _id
        name
      }
    }
  }
`;

export interface GetAllSeriesQueryData {
  series: Array<SeriesData>;
}

export interface SeriesData {
  _id: string;
  title: string;
  description: string;
  released_year: number;
  image: string;
  maturity_rating: {
    _id: string;
    name: string;
  };
  genres: Array<{
    _id: string;
    name: string;
  }>;
}
