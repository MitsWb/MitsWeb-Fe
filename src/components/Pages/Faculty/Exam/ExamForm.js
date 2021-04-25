import React, { useEffect, useState } from "react";
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
import useHeading from "../../Shared/useHeading";
import { getAllsubjects, getExamTypes } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Loader, Notify } from "../../../../utils";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles({
  paper: {
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  card: {
    minWidth: 275,
    maxWidth: 350,
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
  textField: {
    width: 220,
  },
});

const ExamForm = ({
  handleChange,
  handleSubmit,
  Form,
  setForm,
  Loading,
  Error,
  title = "New exam",
}) => {
  useHeading("Exam");

  const dispatch = useDispatch();

  const classes = useStyles();

  const [subjects, setSubjects] = useState({
    ready: false,
    data: [],
  });

  const [examTypes, setExamTypes] = useState({
    ready: false,
    data: [],
  });

  const [notify, setnotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getAllsubjects()).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setSubjects({ ready: true, data: res.data.data });
        } else {
          setnotify({
            msg: res.data.msg,
            popup: true,
            type: "error",
          });
        }
      }
    });

    dispatch(getExamTypes()).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setExamTypes({ ready: true, data: res.data.data });
        } else {
          setnotify({
            msg: res.data.msg,
            popup: true,
            type: "error",
          });
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      {subjects.ready && examTypes.ready ? (
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
                  <Autocomplete
                    options={examTypes.data}
                    getOptionLabel={(option) => option.type}
                    className={classes.textField}
                    onChange={(e, value) => {
                      setForm({ ...Form, examType: value._id });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        size="small"
                        label="Exam Type"
                        variant="outlined"
                        error={Error["examType"]}
                        helperText={Error["examType"]}
                      />
                    )}
                  />
                </Grid>

                <Grid item>
                  <Autocomplete
                    options={subjects.data}
                    getOptionLabel={(option) => option.name}
                    className={classes.textField}
                    onChange={(e, value) => {
                      setForm({ ...Form, subject: value._id });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Subject"
                        name="subject"
                        variant="outlined"
                        error={Error["subject"]}
                        helperText={Error["subject"]}
                      />
                    )}
                  />
                </Grid>

                <Grid item>
                  <StepLabel>On Date</StepLabel>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    type="date"
                    name="date"
                    value={Form.date}
                    onChange={handleChange}
                    error={Error["date"]}
                    helperText={Error["date"]}
                  />
                </Grid>

                <Grid item>
                  <StepLabel>Start Time</StepLabel>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    type="time"
                    name="startTimestamp"
                    value={Form.startTimestamp}
                    onChange={handleChange}
                    error={Error["startTimestamp"]}
                    helperText={Error["startTimestamp"]}
                  />
                </Grid>

                <Grid item>
                  <StepLabel>End Time</StepLabel>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    type="time"
                    name="endTimestamp"
                    value={Form.endTimestamp}
                    onChange={handleChange}
                    error={Error["endTimestamp"]}
                    helperText={Error["endTimestamp"]}
                  />
                </Grid>

                <Grid item>
                  <Grid item>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Number Of Questons"
                      placeholder={5}
                      className={classes.textField}
                      name="numberOfQuestions"
                      value={Form.numberOfQuestions}
                      onChange={handleChange}
                      error={Error["numberOfQuestions"]}
                      helperText={Error["numberOfQuestions"]}
                    />
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
            {Loading && <LinearProgress />}
          </Card>
        </div>
      ) : (
        <Loader msg={"Loading subjects and exam types"} />
      )}
    </>
  );
};

export default ExamForm;
