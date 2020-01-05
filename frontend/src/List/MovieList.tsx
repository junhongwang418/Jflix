import React from "react";
import { Query } from 'react-apollo';
import {GetAllMoviesQuery, GetAllMoviesQueryData} from "../Query/GetAllMoviesQuery";
import {createStyles, Typography, WithStyles, WithWidth} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },

  gridList: {
    flexWrap: "nowrap"
  }
});


interface MovieListProps extends WithWidth, WithStyles<typeof styles> { }

class MovieList extends React.Component<MovieListProps> {

  private getGridListCols = () => {

    const { width } = this.props;

    if (isWidthUp('xl', width)) {
      return 9.5
    }

    if (isWidthUp('lg', width)) {
      return 7.5;
    }

    if (isWidthUp('md', width)) {
      return 5.5;
    }

    if (isWidthUp("sm", width)) {
      return 4.5;
    }

    return 3.5;

  };

  render() {

    const { classes } = this.props;

    return (
      <Query<GetAllMoviesQueryData, {}> query={GetAllMoviesQuery}>
        {({ loading, error, data }) => {

          if (loading) {
            return <div>Loading...</div>
          }

          if (error) {
            return <div>Error: Failed to fetch data</div>
          }

          return (
            <div>
              <Typography variant="h5" color="textPrimary" gutterBottom>Junhong's Favorite Movies</Typography>
              <div>
                <GridList className={classes.gridList} cols={this.getGridListCols()} cellHeight="auto">
                  {
                    data.movies.map(movie =>
                      <GridListTile key={movie._id}>
                        <img src={movie.image} alt={movie.title} style={{ display: "block", width: "100%", height: "auto" }} />
                      </GridListTile>
                    )
                  }
                </GridList>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withWidth()(MovieList));
