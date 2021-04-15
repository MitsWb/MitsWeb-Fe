import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(1),
  },
}));

export default function PeriodTimings({
  inputFields,
  setInputFields,
  handleInputChange,
}) {
  const classes = useStyles();

  const handleAddFields = (index) => {
    const values = [...inputFields];
    values[index].timings.push({
      subject: "",
      startTime: new Date(),
      endTime: new Date(),
    });
    setInputFields(values);
  };

  const handleRemoveFields = (index, timingIndex) => {
    const values = [...inputFields];
    values[index].timings.splice(timingIndex, 1);
    setInputFields(values);
  };

  const handleAddNextDayFields = () => {
    const values = [...inputFields];
    values.push({
      day: "Monday",
      timings: [{ subject: "", startTime: new Date(), endTime: new Date() }],
    });
    setInputFields(values);
  };

  const handleRemoveNextDayFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Periods Time Information
      </Typography>
      {inputFields.map((inputField, index) => (
        <Fragment key={`${inputField}~${index}`}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Week Day
                </InputLabel>
                <Select
                  native
                  value={inputField.day}
                  onChange={(event) =>
                    handleInputChange(index, 0, event, "day")
                  }
                  label="Week Day"
                  inputProps={{
                    name: "day",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option value={"monday"}>Monday</option>
                  <option value={"tuesday"}>Tuesday</option>
                  <option value={"wednesday"}>Wednesday</option>
                  <option value={"thursday"}>Thursday</option>
                  <option value={"friday"}>Friday</option>
                </Select>
              </FormControl>
            </Grid>
            {inputField.timings.map((timing, timingIndex) => (
              <Fragment key={`${timing}~${timingIndex}`}>
                <Grid item xs={12}>
                  <TextField
                    style={{ marginTop: "-20px" }}
                    required
                    id="subject"
                    label="Subject"
                    fullWidth
                    onChange={(event) =>
                      handleInputChange(index, timingIndex, event, "subject")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      label={"Start Time"}
                      value={timing.startTime}
                      onChange={(event) =>
                        handleInputChange(
                          index,
                          timingIndex,
                          event,
                          "startTime"
                        )
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      label={"End Time"}
                      value={timing.endTime}
                      onChange={(event) =>
                        handleInputChange(index, timingIndex, event, "endTime")
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} className={classes.buttonGroup}>
                  <label>Add next subject on {inputField.day}</label>
                  <ButtonGroup
                    color="secondary"
                    aria-label="outlined secondary button group"
                  >
                    <Button
                      style={{ outline: "none" }}
                      onClick={() => handleRemoveFields(index, timingIndex)}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button
                      style={{ outline: "none" }}
                      onClick={() => handleAddFields(index)}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Fragment>
            ))}
          </Grid>
          <ColoredLine color="blue" />
          <label>Add next day subjects</label>
          <Grid item xs={12} className={classes.buttonGroup}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                style={{ outline: "none" }}
                onClick={() => handleRemoveNextDayFields(index)}
              >
                <RemoveIcon />
              </Button>
              <Button
                style={{ outline: "none" }}
                onClick={() => handleAddNextDayFields(index)}
              >
                <AddIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Fragment>
      ))}
    </React.Fragment>
  );
}
