import React from "react";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SeriesGenreForm extends React.Component {

  render() {
    return (
      <div>
        <Typography variant="h5" color="textPrimary">Series Genre Form</Typography>
        <div>
          <TextField
            required
            label="name"
            variant="outlined"
          />
        </div>
        <div>
          <Button
            variant="outlined"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

}

export default SeriesGenreForm;
