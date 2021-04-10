import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
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
  card: {
    margin: "0px auto",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

const AddUserForm = ({ handleChange, handleSubmit, Form, Error, loading }) => {
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
              <InputLabel htmlFor="email">Email</InputLabel>
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
              <InputLabel htmlFor="password">Password</InputLabel>
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
          <div className="w-full p-3 mt-3">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="filled" className={classes.formControl}>
                  <Select
                    value={Form.type}
                    onChange={handleChange}
                    displayEmpty
                    id="type"
                    name="type"
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                    <MenuItem value={"faculty"}>Faculty</MenuItem>
                    <MenuItem value={"security"}>Security</MenuItem>
                    <MenuItem value={"office"}>Office</MenuItem>
                  </Select>
                  <FormHelperText>User Type</FormHelperText>
                </FormControl>
              </Grid>

              {(Form.type === "student" || Form.type === "faculty") && (
                <Grid item xs={12} sm={6}>
                  <FormControl
                    error={Error["department"]}
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Select
                      Error={Error["department"]}
                      onChange={handleChange}
                      displayEmpty
                      id="department"
                      name="department"
                      value={Form.department}
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="None">
                        <em>Select</em>
                      </MenuItem>
                      <MenuItem value={"CE"}>CE</MenuItem>
                      <MenuItem value={"ME"}>ME</MenuItem>
                      <MenuItem value={"EEE"}>EEE</MenuItem>
                      <MenuItem value={"ECE"}>ECE</MenuItem>
                      <MenuItem value={"CSE"}>CSE</MenuItem>
                    </Select>
                    <FormHelperText style={{ fontSize: 13 }}>
                      Department
                    </FormHelperText>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </div>
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
      </form>
    </Card>
  );
};

export default AddUserForm;
