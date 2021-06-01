import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: "10px 0",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddEventDialog({
  open,
  form,
  handleClose,
  handleSubmit,
  handleChange,
  loading,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the details to create the event.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.start}
                variant="outlined"
                disabled
                label="Start"
                name="start"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.end}
                variant="outlined"
                disabled
                label="end"
                name="end"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"all"}>All Departments</MenuItem>
                  <MenuItem value={"CSE"}>CSE</MenuItem>
                  <MenuItem value={"ECE"}>ECE</MenuItem>
                  <MenuItem value={"ME"}>ME</MenuItem>
                  <MenuItem value={"EEE"}>EEE</MenuItem>
                  <MenuItem value={"CE"}>CE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Year</InputLabel>
                <Select
                  label="Year"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>All Years</MenuItem>
                  <MenuItem value={1}>First Year</MenuItem>
                  <MenuItem value={2}>Second Year</MenuItem>
                  <MenuItem value={3}>Third Year</MenuItem>
                  <MenuItem value={4}>Forth Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            onChange={handleChange}
            label="Title"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
        {loading && <LinearProgress color="secondary" />}
      </Dialog>
    </div>
  );
}
