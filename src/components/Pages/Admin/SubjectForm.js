import React, { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import { ExpandMore } from "@material-ui/icons";

const LoaderButton = ({ Loading, handleSubmit, type }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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
        {type} Subject
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "700px",
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },

  submit: {},
  wrapper: {
    position: "relative",
  },
  card: {
    margin: "0px auto",
  },
  selectMenu: {
    marginTop: 10,
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
  },
  studentRadio: {
    "&$checked": {
      color: "#FFFF33",
    },
  },
  textField: {
    marginLeft: "10px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  checked: {},
}));

function SubjectForm({
  Form,
  handleChange,
  handleSubmit,
  Error,
  loading,
  title,
}) {
  const minimalSelectClasses = useMinimalSelectStyles();
  const classes = useStyles();
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return (
      <ExpandMore
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };
  return (
    <div>
      <Card className={classes.form}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <TextField
                required
                id="outlined-margin-dense"
                name="name"
                value={Form.name}
                label="Subject Name"
                onChange={handleChange}
                autoComplete="name"
                error={Error["name"]}
                helperText={Error["name"]}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Subject Code"
                id="outlined-margin-dense"
                margin="normal"
                variant="outlined"
                name="code"
                value={Form.code}
                onChange={handleChange}
                error={Error["code"]}
                helperText={Error["code"]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <FormControl className={classes.formControl}>
                <Select
                  disableUnderline
                  classes={{ root: minimalSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  value={Form.semester}
                  onChange={handleChange}
                  displayEmpty
                  id="semester"
                  name="semester"
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={1}>S1</MenuItem>
                  <MenuItem value={2}>S2</MenuItem>
                  <MenuItem value={3}>S3</MenuItem>
                  <MenuItem value={4}>S4</MenuItem>
                  <MenuItem value={5}>S5</MenuItem>
                  <MenuItem value={6}>S6</MenuItem>
                  <MenuItem value={7}>S7</MenuItem>
                  <MenuItem value={8}>S8</MenuItem>
                </Select>
                <FormHelperText>Semester</FormHelperText>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl className={classes.formControl}>
                <Select
                  disableUnderline
                  classes={{ root: minimalSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  value={Form.department}
                  onChange={handleChange}
                  displayEmpty
                  id="department"
                  name="department"
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"CE"}>CE</MenuItem>
                  <MenuItem value={"ME"}>ME</MenuItem>
                  <MenuItem value={"EEE"}>EEE</MenuItem>
                  <MenuItem value={"ECE"}>ECE</MenuItem>
                  <MenuItem value={"CSE"}>CSE</MenuItem>
                </Select>
                <FormHelperText>Department</FormHelperText>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl className={classes.formControl}>
                <Select
                  disableUnderline
                  classes={{ root: minimalSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  onChange={handleChange}
                  displayEmpty
                  id="courseType"
                  name="courseType"
                  value={Form.courseType}
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="None">
                    <em>Select type</em>
                  </MenuItem>
                  <MenuItem value={"lab"}>Lab</MenuItem>
                  <MenuItem value={"theory"}>Theory</MenuItem>
                </Select>
                <FormHelperText style={{ fontSize: 13 }}>
                  Subject type
                </FormHelperText>
              </FormControl>
            </Grid>
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
        </form>
      </Card>{" "}
    </div>
  );
}

export default SubjectForm;
