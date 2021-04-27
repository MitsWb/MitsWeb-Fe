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
  KeyboardTimePicker,
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
        {type}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const GatePassForm = ({
  handleChange,
  handleSubmit,
  Form,
  Error,
  date,
  handleDateChange,
  loading,
  title = "Gatepass",
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.form}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="mr-0 md:mr-2 lg:mr-2">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="On Date"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </div>
                <div className="ml-0 md:ml-2 lg:ml-2">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="On Time"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Gate Pass Description"
                value={Form.description}
                fullWidth
                onChange={handleChange}
                autoComplete="Description"
                error={Error["Description"] ? true : false}
                helperText={Error["Description"]}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="text-center">
                <LoaderButton
                  type={"Submit"}
                  handleSubmit={handleSubmit}
                  Loading={loading}
                />
              </div>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
    </Card>
  );
};

export default GatePassForm;
