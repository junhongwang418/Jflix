import React from "react";
import { Query } from 'react-apollo';
import {GetAllMoviesQuery, GetAllMoviesQueryData, MovieData} from "../Query/GetAllMoviesQuery";
import {createStyles, Typography, WithStyles, WithWidth} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const styles = createStyles({
  image: {
    width: 200,
    height: 280,
    objectFit: "cover"
  },
  list: {
    display: "flex",
    flexDirection: "row",
    overflow: "auto"
  },
  listItem: {
    padding: 0,
    marginRight: 4,
    height: "100%",
    "&:hover": {
      transform: "scale(1.1)",
      zIndex: 1,
      cursor: "pointer"
    },
    transition: "transform 300ms ease"
  }
});

interface MovieListProps extends WithStyles<typeof styles> {}

interface MovieListState {
  selectedMovie?: MovieData;
}

class MovieList extends React.Component<MovieListProps, MovieListState> {

  constructor(props: MovieListProps) {
    super(props);

    this.state = {
      selectedMovie: null
    };
  }

  private handleDialogClose = () => {
    this.setState({ selectedMovie: null });
  };

  render() {

    const { classes } = this.props;
    const { selectedMovie } = this.state;

    return (
      <div>
        <Typography
          variant="h5"
          color="textPrimary"
          gutterBottom
        >
          Junhong's Favorite Movies
        </Typography>
        <Query<GetAllMoviesQueryData, {}> query={GetAllMoviesQuery}>
          {({ loading, error, data }) => {

            if (loading) {
              return <div>Loading...</div>
            }

            if (error) {
              return <div>Error: Failed to fetch data</div>
            }

            return (
              <List className={classes.list}>
                {
                  data.movies.map(movie =>
                    <ListItem
                      key={movie._id}
                      className={classes.listItem}
                      onClick={() => {
                        this.setState({ selectedMovie: movie });
                      }}
                    >
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className={classes.image}
                      />
                    </ListItem>
                  )
                }
              </List>
            );
          }}
        </Query>
        {
          selectedMovie &&
          <Dialog
            open={Boolean(selectedMovie)}
            onClose={this.handleDialogClose}
          >
            <DialogTitle>{selectedMovie.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body2">
                  {
                    selectedMovie.genres.map(genre => `• ${genre.name} `)
                  }
                </Typography>
                <Typography variant="overline">
                  {selectedMovie.maturity_rating.name}
                </Typography>
                <Typography variant="body1">
                  {selectedMovie.description}
                </Typography>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        }
      </div>
    );
  }
}

export default withStyles(styles)(MovieList);
