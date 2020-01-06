import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Jflix from "../../jflix.png";
import Typography from "@material-ui/core/Typography";
import {NavLink, Link} from "react-router-dom";
import {AppBar, createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) => createStyles({

  inactiveLink: {
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.text.disabled
    },
    transition: "color 0.4s ease"
  },

  activeLink: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.text.primary,
      cursor: "default"
    }
  },

  childSpacing: {
    "& > *": {
      marginRight: 24
    }
  }
});

interface NavigationBarProps extends WithStyles<typeof styles> {}

class NavigationBar extends React.Component<NavigationBarProps> {
  render() {

    const { classes } = this.props;

    return (
      <AppBar position="sticky" style={{ backgroundColor: "rgb(20, 20, 20)" }}>
        <Toolbar className={classes.childSpacing}>
          <Link to="/">
            <img src={Jflix} alt="Jflix" height={32} />
          </Link>
          <Typography variant="body2">
            <NavLink
              exact
              to="/"
              className={classes.inactiveLink}
              activeClassName={classes.activeLink}
            >
              Home
            </NavLink>
          </Typography>
          <Typography variant="body2">
            <NavLink
              to="/series"
              className={classes.inactiveLink}
              activeClassName={classes.activeLink}
            >
              TV Shows
            </NavLink>
          </Typography>
          <Typography variant="body2">
            <NavLink
              to="/movies"
              className={classes.inactiveLink}
              activeClassName={classes.activeLink}
            >
              Movies
            </NavLink>
          </Typography>
          {/*<Typography variant="body2">*/}
          {/*  <NavLink*/}
          {/*    to="/forms"*/}
          {/*    className={classes.inactiveLink}*/}
          {/*    activeClassName={classes.activeLink}*/}
          {/*  >*/}
          {/*    Forms*/}
          {/*  </NavLink>*/}
          {/*</Typography>*/}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavigationBar);
