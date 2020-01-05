import {gql} from "apollo-boost";

export const GetAllMaturityRatingsQuery = gql`
  query {
    maturity_ratings: getAllMaturityRatings {
      _id
      name
    }
  }
`;

export interface GetAllMaturityRatingsQueryData {
  maturity_ratings: Array<{
    _id: string,
    name: string
  }>;
}
