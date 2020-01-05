import {gql} from "apollo-boost";

export const AddMovieMutation = gql`
  mutation AddMovie(
    $title: String!, 
    $description: String!, 
    $released_year: Int!,
    $maturity_rating_id: ID!,
    $genre_ids: [ID!]!,
    $image: String!
  ) {
    movie: addMovie(
      title: $title, 
      description: $description, 
      released_year: $released_year,
      maturity_rating_id: $maturity_rating_id,
      genre_ids: $genre_ids,
      image: $image
    ) {
      _id
      title
    }
  }
`;

export interface AddMovieMutationData {
  movie: {
    _id: string;
    title: string;
  }
}

export interface AddMovieMutationVariables {
  title: string;
  description: string;
  released_year: number;
  maturity_rating_id: string;
  genre_ids: Array<string>;
  image: string;
}

