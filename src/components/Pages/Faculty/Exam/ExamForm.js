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
import { getAllsubjects, getExamTypes } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Loader, Notify } from "../../../../utils";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dimensions from "../../Shared/Dimensions";
const useStyles = makeStyles({
  paper: {
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  grid: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    margin: "0px auto",
  },
  title: {
    marginTop: 20,
    fontSize: 18,
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
  const dispatch = useDispatch();
  const { width } = Dimensions();
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

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setDataLoading(true);
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
          setDataLoading(false);
        }
      }
      setDataLoading(false);
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
      {subjects.ready && examTypes.ready && (
        <div>
          <Card className={classes.card}>
            <Typography className={classes.title} align="center">
              {title}
            </Typography>
            <Grid
              alignItems="center"
              justify="center"
              direction={width < 600 ? "column" : "row"}
              container
              spacing={3}
              className={classes.grid}
            >
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <StepLabel>No of Questions</StepLabel>
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
              style={{ margin: "0px auto", outline: "none" }}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              <Typography>Submit</Typography>
            </Button>
            {Loading && <LinearProgress />}
          </Card>
        </div>
      )}
      {dataLoading && <Loader msg={"Loading exam creation form"} />}
      {!dataLoading && (!subjects.ready || !examTypes.ready) && (
        <h1>There is some problem loading the form!!</h1>
      )}
    </>
  );
};

export default ExamForm;
