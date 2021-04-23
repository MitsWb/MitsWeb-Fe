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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExamType } from "../../../../redux/apiActions";
import Notify from "../../../../utils/Notify";
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
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -5,
    marginLeft: -1,
  },
});

const ExamTypeForm = () => {
  useHeading("Exam");
  const classes = useStyles();
  const dispatch = useDispatch();

  const initForm = {
    type: "",
    maxMark: "",
    passMark: "",
  };

  const initError = {
    type: "",
    maxMark: "",
    passMark: "",
  };
  const [Form, setForm] = useState(initForm);
  const [Error, setError] = useState(initError);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }

      if (isNaN(Form.maxMark)) {
        formValid = false;
        err["maxMark"] = "Must be a number";
      }

      if (isNaN(Form.passMark)) {
        formValid = false;
        err["passMark"] = "Must be a number";
      }

      if (Form.passMark > Form.maxMark) {
        formValid = false;
        err["passMark"] = "Cannot be greater than max mark";
      }
    });

    setError(err);

    return formValid;
  };

  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    setError(err);
    if (validInputs()) {
      setLoading(true);
      dispatch(createExamType(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setNotify({
              msg: "Exam type created",
              popup: true,
              type: "success",
            });
            setForm(initForm);
            setLoading(false);
          } else {
            setNotify({
              msg: "Exam type creation failed!!",
              popup: true,
              type: "error",
            });
          }
        }
        setLoading(false);
      });
    }
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
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
    </>
  );
};

export default ExamTypeForm;
