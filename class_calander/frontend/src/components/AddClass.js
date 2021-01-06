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
  TextField,
  Typography,
  GridListTileBar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

export default class AddClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      name: "",
      zoom: "",
      start_time: "13:00",
      duration: 50,
    };
  }
  handleChange = (event) => {
    if (event.target.name == "MWF") {
      this.setState({
        M: event.target.checked,
        W: event.target.checked,
        F: event.target.checked,
      });
      return;
    }
    if (event.target.name == "TTh") {
      this.setState({
        T: event.target.checked,
        Th: event.target.checked,
      });
      return;
    }
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };
  handleValueChange = (e) => {
    this.setState({
      [e.target.name]:
        e.target.name == "duration"
          ? parseInt(e.target.value, 10)
          : e.target.value,
    });
  };
  formatDays = () => {
    var days = "0";
    this.state.M ? (days += "1") : (days += "0");
    this.state.T ? (days += "1") : (days += "0");
    this.state.W ? (days += "1") : (days += "0");
    this.state.Th ? (days += "1") : (days += "0");
    this.state.F ? (days += "1") : (days += "0");
    days += "0";
    return days;
  };

  handleAddButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        zoom: this.state.zoom,
        start_time: this.state.start_time,
        class_duration: this.state.duration,
        class_days: this.formatDays(),
      }),
    };
    console.log(requestOptions);
    fetch("api/add-course", requestOptions);
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" compact="h4">
            Add a Class
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            label="Class Name"
            placeholder="Enter a Class Name"
            variant="outlined"
            align="left"
            name="name"
            onChange={this.handleValueChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" compact="h6">
            Class Dates
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.M && this.state.W && this.state.F}
                onChange={this.handleChange}
                name="MWF"
              />
            }
            label="MWF"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.T && this.state.Th}
                onChange={this.handleChange}
                name="TTh"
              />
            }
            label="TTh"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.M}
                onChange={this.handleChange}
                name="M"
              />
            }
            label="M"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.T}
                onChange={this.handleChange}
                name="T"
              />
            }
            label="T"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.W}
                onChange={this.handleChange}
                name="W"
              />
            }
            label="W"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.Th}
                onChange={this.handleChange}
                name="Th"
              />
            }
            label="Th"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.F}
                onChange={this.handleChange}
                name="F"
              />
            }
            label="F"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            id="time"
            label="Start Time"
            type="time"
            defaultValue={this.state.start_time}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            name="start_time"
            onChange={this.handleValueChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={() => {}}
              defaultValue={50}
              inputProps={{ min: 0, step: 5, style: { textAlign: "center" } }}
              name="duration"
              onChange={this.handleValueChange}
            />
            <FormHelperText>
              <div align="center">Class Duration(minutes)</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            label="Zoom Link"
            placeholder="Enter the Class Zoom Link"
            variant="outlined"
            align="left"
            name="zoom"
            onChange={this.handleValueChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleAddButtonPressed}
          >
            Add Class
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
