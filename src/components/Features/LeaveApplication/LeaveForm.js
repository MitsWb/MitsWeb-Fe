import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  StepLabel,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "500px",
    margin: "0px auto",
    padding: "20px 30px 20px 30px",
  },

  submit: {},
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    minWidth: 180,
  },
}));

const LoaderButton = ({ Loading, handleSubmit, type }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      if (!Loading) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    return () => {
      mount = false;
    };
  }, [Loading]);

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        {type} Leave
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const LeaveForm = ({
  handleChange,
  handleSubmit,
  Form,
  Error,
  Loading,
  title,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.form}>
      <Typography variant="h6" gutterBottom>
        Request Leave
      </Typography>
      <form className={classes.form}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {title === "new" && (
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        value={Form.type}
                        onChange={handleChange}
                        displayEmpty
                        name="type"
                        className={classes.formControl}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"fullDay"}>Full Day</MenuItem>
                        <MenuItem value={"halfDay"}>Half Day</MenuItem>
                      </Select>
                      <FormHelperText>Without label</FormHelperText>
                    </FormControl>
                  </Grid>
                )}
                {Form.type === "halfDay" && (
                  <Grid item xs={12} sm={6}>
                    <StepLabel>Date</StepLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      className={classes.formControl}
                      type="date"
                      name="date"
                      value={Form.date}
                      onChange={handleChange}
                      error={Error["startTimestamp"] ? true : false}
                      helperText={Error["startTimestamp"]}
                    />
                  </Grid>
                )}
              </Grid>
              {Form.type === "fullDay" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  <div className="ml-0 md:ml-2 lg:ml-2">
                    <StepLabel>From Date</StepLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      type="date"
                      name="fromDate"
                      value={Form.fromDate}
                      onChange={handleChange}
                      error={Error["fromDate"] ? true : false}
                      helperText={Error["fromDate"]}
                    />
                  </div>
                  <div className="ml-0 md:ml-2 lg:ml-2">
                    <StepLabel>To Date</StepLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      type="date"
                      name="toDate"
                      value={Form.toDate}
                      onChange={handleChange}
                      error={Error["toDate"] ? true : false}
                      helperText={Error["toDate"]}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  <div className="ml-0 md:ml-2 lg:ml-2">
                    <StepLabel>From time</StepLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      type="time"
                      name="fromTime"
                      value={Form.fromTime}
                      onChange={handleChange}
                      error={Error["fromTime"] ? true : false}
                      helperText={Error["fromTime"]}
                    />
                  </div>
                  <div className="ml-0 md:ml-2 lg:ml-2">
                    <StepLabel>To time</StepLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      type="time"
                      name="toTime"
                      value={Form.toTime}
                      onChange={handleChange}
                      error={Error["toTime"] ? true : false}
                      helperText={Error["toTime"]}
                    />
                  </div>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Leave Description"
                value={Form.description}
                fullWidth
                onChange={handleChange}
                autoComplete="Description"
                error={Error["description"]}
                helperText={Error["description"]}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="text-center">
                <LoaderButton
                  type={"Submit"}
                  handleSubmit={handleSubmit}
                  Loading={Loading}
                />
              </div>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
    </Card>
  );
};

export default LeaveForm;
