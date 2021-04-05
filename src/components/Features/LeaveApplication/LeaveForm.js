import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
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
  date,
  handleDateChange,
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="ml-0 md:ml-2 lg:ml-2">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    error={Error["fromTimestamp"]}
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="fromTimestamp"
                    label="From"
                    value={date.fromTimestamp}
                    onChange={(e) => handleDateChange(e, "fromTimestamp")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <Typography
                    style={{ fontSize: 13, marginTop: -10, color: "red" }}
                  >
                    {Error["fromTimestamp"] ? Error["fromTimestamp"] : ""}
                  </Typography>
                </div>
                <div className="ml-0 md:ml-2 lg:ml-2">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    error={Error["toTimestamp"]}
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="toTimestamp"
                    label="To"
                    value={date.toTimestamp}
                    onChange={(e) => handleDateChange(e, "toTimestamp")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <Typography
                    style={{ fontSize: 13, marginTop: -10, color: "red" }}
                  >
                    {Error["toTimestamp"] ? Error["toTimestamp"] : ""}
                  </Typography>
                </div>
              </div>
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
