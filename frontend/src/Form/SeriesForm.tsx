import React, {ChangeEvent} from "react";
import {TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface SeriesFormProps {
  title?: string;
  description?: string;
  releasedYear?: string;
}

class SeriesForm extends React.Component<SeriesFormProps> {

  constructor(props: SeriesFormProps) {
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
        <Typography variant="h5" color="textPrimary">Series Form</Typography>
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

export default SeriesForm;
