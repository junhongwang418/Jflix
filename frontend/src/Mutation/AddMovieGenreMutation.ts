import {gql} from "apollo-boost";

export const AddMovieGenreMutation = gql`
  mutation AddMovieGenre($name: String!) {
    genre: addMovieGenre(name: $name) {
      _id
      name
    }
  }
`;

export interface AddMovieGenreMutationData {
  genre: {
    _id: string;
    name: string;
  }
}

export interface AddMovieGenreMutationVariables {
  name: string;
}

