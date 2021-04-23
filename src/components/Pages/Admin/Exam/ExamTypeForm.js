import {
  Button,
  Card,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";
import useHeading from "../../useHeading";

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
});

const ExamTypeForm = () => {
  useHeading("Exam");
  const classes = useStyles();
  const handleSubmit = () => {
    return;
  };
  return (
    <>
      <Card className={classes.card}>
        <Typography className={classes.title} align="center">
          Create Exam Types
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
                  <TextField label="Type" placeholder={"Internal Exam 1"} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <ArrowForward />
                </Grid>
                <Grid item>
                  <TextField label="Maximum Marks" placeholder={20} />
                </Grid>
              </Grid>
            </Grid>{" "}
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <ArrowForward />
                </Grid>
                <Grid item>
                  <TextField label="Passing Marks" placeholder={12} />
                </Grid>
              </Grid>
            </Grid>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
            >
              <Typography>Submit</Typography>
            </Button>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default ExamTypeForm;
