import React, {ChangeEvent} from "react";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";
import {GetAllMovieGenresQuery} from "../Query/GetAllMovieGenresQuery";
import {
  AddMovieGenreMutation,
  AddMovieGenreMutationData,
  AddMovieGenreMutationVariables
} from "../Mutation/AddMovieGenreMutation";
import { Mutation } from "react-apollo";

export interface MovieGenreFormProps {

}

interface MovieGenreFormState {
  name: string;
  snackBarOpen: boolean;
  snackBarMessage: string;
}


class MovieGenreForm extends React.Component<MovieGenreFormProps, MovieGenreFormState> {

  constructor(props: MovieGenreFormProps) {
    super(props);

    this.state = {
      name: "",
      snackBarOpen: false,
      snackBarMessage: ""
    };

  }

  private handleNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  private handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  private handleSnackBarOpen = (message: string) => {
    this.setState({ snackBarOpen: true, snackBarMessage: message });
  };

  render() {

    const { name, snackBarOpen, snackBarMessage } = this.state;

    return (
      <div>
        <Typography variant="h5" color="textPrimary">Movie Genre Form</Typography>
        <div>
          <TextField
            required
            label="name"
            variant="outlined"
            value={name}
            onChange={this.handleNameChange}
          />
        </div>
        <Mutation<AddMovieGenreMutationData, AddMovieGenreMutationVariables>
          mutation={AddMovieGenreMutation}
          onCompleted={(data) => this.handleSnackBarOpen(`Added "${data.genre.name}"`)}
          onError={(error) => this.handleSnackBarOpen(error.message)}
        >
          {(addMovieGenre, { loading, data, error }) => {

            return (
              <Button
                variant="outlined"
                onClick={e => {

                  const movieGenreName = name.length > 0 ? name : null;

                  addMovieGenre({
                    variables: { name: movieGenreName },
                    refetchQueries: [{ query: GetAllMovieGenresQuery }]
                  });

                  this.setState({ name: "" });

                }}
              >
                Submit
              </Button>
            );
          }}
        </Mutation>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackBarOpen}
          onClose={this.handleSnackBarClose}
          autoHideDuration={4000}
          message={snackBarMessage}
          action={[
            <IconButton
              color="inherit"
              onClick={this.handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }

}

export default MovieGenreForm;
