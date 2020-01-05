import React, {ChangeEvent} from "react";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import {
  AddMaturityRatingMutation,
  AddMaturityRatingMutationData,
  AddMaturityRatingMutationVariables
} from "../Mutation/AddMaturityRatingMutation";
import {GetAllMaturityRatingsQuery} from "../Query/GetAllMaturityRatingsQuery";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export interface MaturityRatingFormProps {

}

interface MaturityRatingFormState {
  name: string;
  snackBarOpen: boolean;
  snackBarMessage: string;
}

class MaturityRatingForm extends React.Component<MaturityRatingFormProps, MaturityRatingFormState> {

  constructor(props: MaturityRatingFormProps) {
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
        <Typography variant="h5" color="textPrimary">Maturity Rating Form</Typography>
        <div>
          <TextField
            label="name"
            variant="outlined"
            value={name}
            required
            onChange={this.handleNameChange}
          />
        </div>
        <Mutation<AddMaturityRatingMutationData, AddMaturityRatingMutationVariables>
          mutation={AddMaturityRatingMutation}
          onCompleted={(data) => this.handleSnackBarOpen(`Added "${data.maturity_rating.name}"`)}
          onError={(error) => this.handleSnackBarOpen(error.message)}
        >
          {(addMaturityRating, { loading, data, error }) => {

            return (
              <Button
                variant="outlined"
                onClick={e => {

                  const maturityRatingName = name.length > 0 ? name : null;

                  addMaturityRating({
                    variables: { name: maturityRatingName },
                    refetchQueries: [{ query: GetAllMaturityRatingsQuery }]
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

export default MaturityRatingForm;
