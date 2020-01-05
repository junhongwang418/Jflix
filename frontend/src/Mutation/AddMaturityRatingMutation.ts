import {gql} from "apollo-boost";

export const AddMaturityRatingMutation = gql`
  mutation AddMaturityRating($name: String!) {
    maturity_rating: addMaturityRating(name: $name) {
      _id
      name
    }
  }
`;

export interface AddMaturityRatingMutationData {
  maturity_rating: {
    _id: string;
    name: string;
  }
}

export interface AddMaturityRatingMutationVariables {
  name: string;
}

