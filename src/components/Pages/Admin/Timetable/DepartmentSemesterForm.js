import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DepartmentSemesterForm = ({ state, handleChange }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Department & Semester Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Department
            </InputLabel>
            <Select
              native
              value={state.department}
              onChange={handleChange}
              label="Department"
              inputProps={{
                name: "department",
                id: "outlined-age-native-simple",
              }}
            >
              <option value={"CSE"}>CSE</option>
              <option value={"ECE"}>ECE</option>
              <option value={"ME"}>ME</option>
              <option value={"CE"}>CE</option>
              <option value={"EEE"}>EEE</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Semester
            </InputLabel>
            <Select
              native
              value={state.semester}
              onChange={handleChange}
              label="Semester"
              inputProps={{
                name: "semester",
                id: "outlined-age-native-simple",
              }}
            >
              <option value={1}>S1</option>
              <option value={2}>S2</option>
              <option value={3}>S3</option>
              <option value={4}>S4</option>
              <option value={5}>S5</option>
              <option value={6}>S6</option>
              <option value={7}>S7</option>
              <option value={8}>S8</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default DepartmentSemesterForm;
