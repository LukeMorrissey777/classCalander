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
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  GridListTileBar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default class ViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: null,
    };
  }
  componentDidMount() {
    this.renderCourses();
  }

  renderCourses = () => {
    var courses = fetch("api/course-view")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((courses) => {
        if (courses != null) {
          return courses.map((course) => (
            <Grid container spacing={3}>
              <Grid item xs={12} align="center">
                <Typography variant="h5" compact="h5">
                  {course.name}
                </Typography>
              </Grid>
            </Grid>
          ));
        } else {
          return null;
        }
      })
      .then((classes) => {
        if (classes == null) {
          return;
        }
        return this.setState({ classes: classes });
      });
  };
  renderNoCourses = () => {
    return (
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          You have not added any classes!
        </Typography>
      </Grid>
    );
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h2" compact="h2">
            Your Courses
          </Typography>
        </Grid>
        {console.log(this.state.classes)}
        {this.state.classes == null
          ? this.renderNoCourses()
          : this.state.classes}
      </Grid>
    );
  }
}
