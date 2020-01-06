import React from "react";
import { Query } from 'react-apollo';
import {GetAllMoviesQuery, GetAllMoviesQueryData, MovieData} from "../Query/GetAllMoviesQuery";
import {createStyles, Typography, WithStyles, WithWidth} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import withStyles from "@material-ui/core/styles/withStyles";
import {GetAllSeriesQuery, GetAllSeriesQueryData, SeriesData} from "../Query/GetAllSeriesQuery";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const styles = createStyles({
  image: {
    width: "100%",
    objectFit: "cover"
  },
  list: {
    display: "flex",
    flexDirection: "row",
    overflow: "auto"
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 4,
    "&:hover": {
      transform: "scale(1.1)",
      zIndex: 1,
      cursor: "pointer"
    },
    transition: "transform 300ms ease"
  },

  listItemContent: {
    width: 200,
    height: 280
  }
});

interface SeriesListProps extends WithStyles<typeof styles> { }

interface SeriesListState {
  selectedSeries?: SeriesData;
}

class SeriesList extends React.Component<SeriesListProps, SeriesListState> {

  constructor(props: SeriesListProps) {
    super(props);

    this.state = {
      selectedSeries: null
    };
  }

  private handleDialogClose = () => {
    this.setState({ selectedSeries: null });
  };


  render() {

    const { classes } = this.props;
    const { selectedSeries } = this.state;

    return (
      <div>
        <Typography variant="h5" color="textPrimary" gutterBottom>Junhong's Favorite TV Shows</Typography>
        <Query<GetAllSeriesQueryData, {}> query={GetAllSeriesQuery}>
          {({ loading, error, data }) => {

            if (loading) {
              return <div>Loading...</div>
            }

            if (error) {
              return <div>Error: Failed to fetch data</div>
            }

            return (
              <List
                className={classes.list}
              >
                {
                  data.series.map(series =>
                    <ListItem
                      key={series._id}
                      className={classes.listItem}
                      onClick={() => {
                        this.setState({ selectedSeries: series });
                      }}
                    >
                      <div
                        className={classes.listItemContent}
                      >
                        <img
                          src={series.image}
                          alt={series.title}
                          className={classes.image}
                        />
                      </div>
                    </ListItem>
                  )
                }
              </List>
            );
          }}
        </Query>
        {
          selectedSeries &&
          <Dialog
            open={Boolean(selectedSeries)}
            onClose={this.handleDialogClose}
          >
            <DialogTitle>{selectedSeries.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body2">
                  {
                    selectedSeries.genres.map(genre => `• ${genre.name} `)
                  }
                </Typography>
                <Typography variant="overline">
                  {selectedSeries.maturity_rating.name}
                </Typography>
                <Typography variant="body1">
                  {selectedSeries.description}
                </Typography>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        }
      </div>
    );
  }
}

export default withStyles(styles)(SeriesList);
