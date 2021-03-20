import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
  const [show, setshow] = useState(false);

  return (
    <Card className={classes.form}>
      <Typography variant="h6" gutterBottom>
        Add User
      </Typography>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
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
            <Grid item xs={12} sm={6}>
              <Input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                value={Form.password}
                onChange={handleChange}
                error={Error["password"]}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setshow(!show)}
                    >
                      {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">UserType</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="type"
                defaultValue="top"
                onChange={handleChange}
                value={Form.type}
              >
                <FormControlLabel
                  value="student"
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
                  value="admin"
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
