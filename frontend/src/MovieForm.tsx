import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import {AddMovieMutation, AddMovieMutationData, AddMovieMutationVariables} from "./Mutation/AddMovieMutation";
import {GetAllMoviesQuery} from "./Query/GetAllMoviesQuery";

export interface MovieFormProps {}

interface MovieFormState {
  title?: string;
  description?: string;
  releasedYear?: string;
}

class MovieForm extends React.Component<MovieFormProps, MovieFormState> {

  constructor(props: MovieFormProps) {
    super(props);

    this.state = {
      title: null,
      description: null,
      releasedYear: null
    };
  }

  private handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  private handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ description: e.target.value });
  };

  private handleReleasedYearChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ releasedYear: e.target.value });
  };

  render() {

    const { title, description, releasedYear } = this.state;

    return (
      <div>
        <h3>Movie Form</h3>
        <div>
          <TextField
            required
            label="Title"
            variant="outlined"
            value={title}
            onChange={this.handleTitleChange}
            fullWidth
          />
        </div>
        <div>
          <TextField
            required
            label="Description"
            multiline
            rows="4"
            variant="outlined"
            value={description}
            onChange={this.handleDescriptionChange}
            fullWidth
          />
        </div>
        <div>
          <TextField
            required
            label="Released Year"
            type="number"
            variant="outlined"
            value={releasedYear}
            onChange={this.handleReleasedYearChange}
            fullWidth
          />
        </div>
        <Mutation<AddMovieMutationData, AddMovieMutationVariables> mutation={AddMovieMutation}>
          {(addMovie, { loading, data }) => {

            return (
              <Button
                variant="outlined"
                color="primary"
                onClick={e => {
                  addMovie({
                    variables: {
                      title,
                      description,
                      released_year: parseInt(releasedYear)
                    },
                    refetchQueries: [
                      { query: GetAllMoviesQuery }
                    ]
                  });
                  this.setState({ title: "", description: "", releasedYear: "" });

                }}
              >
                Submit
              </Button>
            );

          }}

        </Mutation>
      </div>
    );
  }

}

export default MovieForm;
