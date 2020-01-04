import {gql} from "apollo-boost";

export const AddMovieMutation = gql`
  mutation AddMovie(
    $title: String!, 
    $description: String!, 
    $released_year: Int!
  ) {
    addMovie(
      title: $title, 
      description: $description, 
      released_year: $released_year
    ) {
      _id
      title
      description
      released_year
    }
  }
`;

export interface AddMovieMutationData {
  addMovie: {
    _id: string;
    title: string;
    description: string;
    released_year: number;
  }
}

export interface AddMovieMutationVariables {
  title: string;
  description: string;
  released_year: number;
}

