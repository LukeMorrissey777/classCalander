import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Grid,
  Button,
  ButtonGroup,
  Typography,
  GridListTileBar,
} from "@material-ui/core";
import AddClass from "./AddClass";
import ViewClass from "./ViewClass";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Course Calander
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/add" component={Link}>
              Add Class
            </Button>
            <Button color="secondary" to="/class-view" component={Link}>
              View Class
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.renderHomePage} />
          <Route path="/add" component={AddClass} />
          <Route path="/class-view" component={ViewClass} />
        </Switch>
      </Router>
    );
  }
}
