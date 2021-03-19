import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

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
  facultyRadio: {
    "&$checked": {
      color: "#7FFF00",
    },
  },
  studentRadio: {
    "&$checked": {
      color: "#FFFF33",
    },
  },
  checked: {},
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
        {type} User
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const AddUserForm = ({ handleChange, handleSubmit, Form, Error }) => {
  const classes = useStyles();

  return (
    <Card className={classes.form}>
      <Typography variant="h6" gutterBottom>
        Add User
      </Typography>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="User Email"
              value={Form.email}
              fullWidth
              onChange={handleChange}
              autoComplete="email"
              error={Error["email"]}
              helperText={Error["email"]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">UserType</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="Student"
                  control={
                    <Radio
                      classes={{
                        root: classes.studentRadio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Student"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="faculty"
                  control={
                    <Radio
                      classes={{
                        root: classes.facultyRadio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Faculty"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Radio color="secondary" />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div className="text-center">
              <LoaderButton type={"Submit"} handleSubmit={handleSubmit} />
            </div>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddUserForm;
