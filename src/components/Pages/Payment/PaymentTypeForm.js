import React from "react";
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  makeStyles,
  StepLabel,
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

const PaymentTypeForm = ({
  handleChange,
  handleSubmit,
  Form,
  loading,
  Error,
  title = "New Payment",
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
                    placeholder={"University Exam Reg. Fees"}
                    name="type"
                    value={Form.type}
                    onChange={handleChange}
                    error={Error["type"] ? true : false}
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
                    label="Amount"
                    placeholder={"Rs. 1700"}
                    name="amount"
                    value={Form.amount}
                    onChange={handleChange}
                    error={Error["amount"] ? true : false}
                    helperText={Error["amount"]}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <StepLabel style={{ marginBottom: 10, marginLeft: 30 }}>
                Due Date
              </StepLabel>

              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <ArrowForward />
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    variant="outlined"
                    type="date"
                    name="dueDate"
                    value={Form.dueDate}
                    onChange={handleChange}
                    error={Error["dueDate"] ? true : false}
                    helperText={Error["dueDate"]}
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

export default PaymentTypeForm;
