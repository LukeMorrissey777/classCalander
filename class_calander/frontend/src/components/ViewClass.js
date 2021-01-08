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
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
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
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "name", headerName: "Course", width: 250 },
  { field: "class_days", headerName: "Class Days", width: 150 },
  { field: "start_time", headerName: "Start Time", width: 150 },
  {
    field: "class_duration",
    headerName: "Duration",
    type: "number",
    width: 150,
  },
  {
    field: "zoom",
    headerName: "Zoom Link",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
  },
];

export default class ViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: null,
      checked: null,
      codes: null,
    };
  }
  componentDidMount() {
    this.getCourses();
  }

  formatClassDays = (days) => {
    let s = "";
    if (days[1] == 1) {
      s = s + "M";
    }
    if (days[2] == 1) {
      s = s + "T";
    }
    if (days[3] == 1) {
      s = s + "W";
    }
    if (days[4] == 1) {
      s = s + "Th";
    }
    if (days[5] == 1) {
      s = s + "F";
    }
    return s;
  };

  formatTime = (time) => {
    let hours = parseInt(time.slice(0, 2));
    if (hours < 12) {
      return time + " AM";
    }
    if (hours == 12) {
      return time + " PM";
    }
    hours = hours - 12;
    let newTime = hours.toString();
    newTime = newTime + time.slice(2, 6) + " PM";
    return newTime;
  };

  formatCourses = (courses) => {
    let rows = [];
    let s = [];
    let c = [];
    for (let i = 0; i < courses.length; i++) {
      rows.push({
        id: i + 1,
        name: courses[i].name,
        class_days: this.formatClassDays(courses[i].class_days),
        start_time: this.formatTime(courses[i].start_time),
        class_duration: courses[i].class_duration,
        zoom: courses[i].zoom,
      });
      s.push(false);
      c.push(courses[i].code);
    }
    this.setState({
      checked: s,
      codes: c,
    });
    return rows;
  };

  getCourses = () => {
    let courses = fetch("api/course-view")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((courses) => {
        if (courses != null) {
          return this.formatCourses(courses);
        } else {
          return null;
        }
      })
      .then((rows) => {
        if (rows == null) {
          return;
        }
        return this.setState({
          classes: (
            <div style={{ height: 400, width: 1000 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
                onSelectionChange={this.handleCheckButtonsPressed}
              />
            </div>
          ),
        });
      });
  };
  handleDeleteButtonsPressed = () => {
    let c = [];
    let found = false;
    for (let i = 0; i < this.state.checked.length; i++) {
      if (this.state.checked[i]) {
        c.push(this.state.codes[i]);
        found = true;
      }
    }
    if (!found) {
      return;
    }
    for (let i = 0; i < c.length; i++) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: c[i],
        }),
      };
      fetch("api/delete-course", requestOptions).then(() => {
        if (i == c.length - 1) {
          window.location.reload();
        }
      });
    }
  };
  handleCheckButtonsPressed = (e) => {
    let temp = [];
    for (let i = 0; i < this.state.checked.length; i++) {
      temp.push(false);
    }
    for (let i = 0; i < e.rowIds.length; i++) {
      temp[e.rowIds[i] - 1] = true;
    }
    this.setState({
      checked: temp,
    });
  };
  renderNoCourses = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            You have not added any classes!
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };
  renderCourses = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {this.state.classes}
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            to="/class-view"
            component={Link}
          >
            Add Selected Classes to Google Calander
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleDeleteButtonsPressed}
          >
            Delete Selected Classes
          </Button>
        </Grid>
      </Grid>
    );
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h2" compact="h2">
            Your Courses
          </Typography>
        </Grid>
        {this.state.classes == null
          ? this.renderNoCourses()
          : this.renderCourses()}
      </Grid>
    );
  }
}
