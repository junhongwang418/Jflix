import {gql} from "apollo-boost";

export const AddSeriesGenreMutation = gql`
  mutation AddSeriesGenre($name: String!) {
    genre: addSeriesGenre(name: $name) {
      _id
      name
    }
  }
`;

export interface AddSeriesGenreMutationData {
  genre: {
    _id: string;
    name: string;
  }
}

export interface AddSeriesGenreMutationVariables {
  name: string;
}

