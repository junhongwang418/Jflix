import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";
import { Query, Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import {AddMovieMutation, AddMovieMutationData, AddMovieMutationVariables} from "../Mutation/AddMovieMutation";
import {GetAllMoviesQuery} from "../Query/GetAllMoviesQuery";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";
import MenuItem from "@material-ui/core/MenuItem";
import {GetAllMaturityRatingsQuery, GetAllMaturityRatingsQueryData} from "../Query/GetAllMaturityRatingsQuery";
import {Autocomplete} from "@material-ui/lab";
import {GetAllMovieGenresQuery, GetAllMovieGenresQueryData} from "../Query/GetAllMovieGenresQuery";
import {GetAllSeriesGenresQuery, GetAllSeriesGenresQueryData} from "../Query/GetAllSeriesGenresQuery";
import {AddSeriesMutation, AddSeriesMutationData, AddSeriesMutationVariables} from "../Mutation/AddSeriesMutation";
import {GetAllSeriesQuery} from "../Query/GetAllSeriesQuery";

export interface SeriesFormProps {}

interface SeriesFormState {
  title: string;
  description: string;
  releasedYear: string;
  maturityRatingId: string;
  genres: Array<{
    _id: string;
    name: string;
  }>;
  image: string;
  snackBarOpen: boolean;
  snackBarMessage: string;
}

class SeriesForm extends React.Component<SeriesFormProps, SeriesFormState> {

  constructor(props: SeriesFormProps) {
    super(props);

    this.state = {
      title: "",
      description: "",
      releasedYear: "",
      maturityRatingId: "",
      genres: [],
      image: "",
      snackBarOpen: false,
      snackBarMessage: ""
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

  private handleMaturityRatingIdChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ maturityRatingId: e.target.value });
  };

  private handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  private handleSnackBarOpen = (message: string) => {
    this.setState({ snackBarOpen: true, snackBarMessage: message });
  };

  private handleGenreIdsChange = (e: ChangeEvent<{}>, value: any) => {
    this.setState({ genres: value });
  };

  private handleImageChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ image: e.target.value });
  };

  render() {

    const {
      title,
      description,
      releasedYear,
      maturityRatingId,
      genres,
      image,
      snackBarOpen,
      snackBarMessage
    } = this.state;

    return (
      <div>
        <Typography variant="h5" color="textPrimary">TV Shows Form</Typography>
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
        <Query<GetAllMaturityRatingsQueryData, {}>
          query={GetAllMaturityRatingsQuery}
        >
          {({ loading, data, error }) => {

            if (loading) {
              return <div>Loading...</div>
            }

            if (error) {
              return <div>Error: Failed to fetch data</div>
            }

            return (
              <div>
                <TextField
                  required
                  select
                  label="Maturity Rating"
                  variant="outlined"
                  value={maturityRatingId}
                  onChange={this.handleMaturityRatingIdChange}
                  fullWidth
                >
                  {
                    data.maturity_ratings.map(maturity_rating =>
                      <MenuItem key={maturity_rating._id} value={maturity_rating._id}>
                        {maturity_rating.name}
                      </MenuItem>
                    )
                  }

                </TextField>
              </div>
            );
          }}

        </Query>

        <Query<GetAllSeriesGenresQueryData, {}>
          query={GetAllSeriesGenresQuery}
        >
          {({ loading, data, error }) => {

            if (loading) {
              return <div>Loading...</div>
            }

            if (error) {
              return <div>Erorr: Failed to fetch data</div>
            }

            return (
              <Autocomplete
                multiple
                value={genres}
                onChange={this.handleGenreIdsChange}
                options={data.genres}
                getOptionLabel={genre => genre.name}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    required
                    variant="outlined"
                    label="Genres"
                    placeholder="Add genre"
                    fullWidth
                  />
                )}
              />
            );

          }}

        </Query>

        <div>
          <TextField
            required
            label="Image URL"
            value={image}
            variant="outlined"
            onChange={this.handleImageChange}
            fullWidth
          />
        </div>

        <Mutation<AddSeriesMutationData, AddSeriesMutationVariables>
          mutation={AddSeriesMutation}
          onCompleted={(data) => this.handleSnackBarOpen(`Added "${data.series.title}"`)}
          onError={(error) => this.handleSnackBarOpen(error.message)}
        >
          {(addMovie, { loading, data, error }) => {

            return (
              <Button
                variant="outlined"
                onClick={e => {

                  const seriesTitle = title.length > 0 ? title : null;
                  const seriesDescription = description.length > 0 ? description : null;
                  const seriesMaturityRatingId = maturityRatingId.length > 0 ? maturityRatingId : null;
                  const seriesImage = image.length > 0 ? image : null;

                  addMovie({
                    variables: {
                      title: seriesTitle,
                      description: seriesDescription,
                      released_year: parseInt(releasedYear),
                      maturity_rating_id: seriesMaturityRatingId,
                      genre_ids: genres.map(genre => genre._id),
                      image: seriesImage
                    },
                    refetchQueries: [
                      { query: GetAllSeriesQuery }
                    ]
                  });

                  this.setState({
                    title: "", description: "",
                    releasedYear: "",
                    maturityRatingId: "",
                    genres: [],
                    image: ""
                  });

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

export default SeriesForm;
