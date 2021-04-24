import React from "react";
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles({
  paper: {
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  card: {
    minWidth: 275,
    maxWidth: 400,
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  grid: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    margin: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 18,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -5,
    marginLeft: -1,
  },
});

const ExamTypeForm = ({
  handleChange,
  handleSubmit,
  Form,
  loading,
  Error,
  title = "New exam",
}) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <Typography className={classes.title} align="center">
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            spacing={3}
            className={classes.grid}
          >
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <ArrowForward />
                </Grid>
                <Grid item>
                  <TextField
                    label="Type"
                    placeholder={"Internal Exam 1"}
                    name="type"
                    value={Form.type}
                    onChange={handleChange}
                    error={Error["type"]}
                    helperText={Error["type"]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <ArrowForward />
                </Grid>
                <Grid item>
                  <TextField
                    label="Maximum Marks"
                    placeholder={20}
                    name="maxMark"
                    value={Form.maxMark}
                    onChange={handleChange}
                    error={Error["maxMark"]}
                    helperText={Error["maxMark"]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <ArrowForward />
                </Grid>
                <Grid item>
                  <TextField
                    label="Passing Marks"
                    placeholder={12}
                    name="passMark"
                    value={Form.passMark}
                    onChange={handleChange}
                    error={Error["passMark"]}
                    helperText={Error["passMark"]}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              <Typography>Submit</Typography>
            </Button>
          </Grid>
        </form>
        {loading && <LinearProgress />}
      </Card>
    </div>
  );
};

export default ExamTypeForm;
