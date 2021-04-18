import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Review from "./Review";
import DepartmentSemesterForm from "./DepartmentSemesterForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import PeriodTimings from "./PeriodTimings";
import useHeading from "../../useHeading";
import { useDispatch } from "react-redux";
import { createTimetable } from "../../../../redux/apiActions";
import LoaderButton from "../../../../utils/LoaderButton";
import Notify from "../../../../utils/Notify";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Department & Semester", "Period timings", "Review timetable"];

export default function CreateTimeTableForm() {
  useHeading("Timetable");
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  //for department semester form
  const [state, setState] = React.useState({
    department: "CSE",
    semester: 1,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //for period timings
  const [inputFields, setInputFields] = useState([
    {
      day: "Monday",
      timings: [
        {
          subject: "",
          startTime: new Date(),
          endTime: new Date(),
        },
      ],
    },
  ]);

  const handleInputChange = (index, timingIndex, event, type) => {
    const values = [...inputFields];
    if (type === "startTime") {
      values[index].timings[timingIndex].startTime = event;
    } else if (type === "endTime") {
      values[index].timings[timingIndex].endTime = event;
    } else if (type === "day") {
      values[index].day = event.target.value;
    } else {
      values[index].timings[timingIndex].subject = event.target.value;
    }
    setInputFields(values);
  };

  const finalData = {
    periodTimings: [...inputFields],
    semesterDepartment: { ...state },
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DepartmentSemesterForm state={state} handleChange={handleChange} />
        );
      case 1:
        return (
          <PeriodTimings
            inputFields={inputFields}
            setInputFields={setInputFields}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return <Review Data={finalData} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [success, setSuccess] = useState(false);

  function submitHandler(e) {
    console.log("called");
    e.preventDefault();
    if (true) {
      setLoading(true);
      dispatch(createTimetable(finalData)).then((res) => {
        if (res && res.data) {
          setLoading(false);
          if (res.data.success === true) {
            setSuccess(true);
            setnotify({
              msg: "Timetable creation success",
              type: "success",
              popup: true,
            });
          } else {
            setLoading(false);
            setnotify({
              msg: res.data.msg,
              type: "error",
              popup: true,
            });
          }
        }
        setLoading(false);
      });
    }
  }

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Timetable
            </Typography>
            <Stepper
              activeStep={activeStep}
              style={{
                margin: "30px 0 15px",
              }}
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  {success === false ? (
                    <LoaderButton
                      Loading={loading}
                      handleSubmit={submitHandler}
                      text={"Confirm"}
                    />
                  ) : (
                    ""
                  )}
                  {success === true ? (
                    <>
                      <Typography variant="h5" gutterBottom>
                        Thank you for creating timetable.
                      </Typography>
                      <Typography variant="subtitle1">
                        Timetable has been created successfully and it can be
                        viewed by students and faculty. You have the privilege
                        to edit and delete it.
                      </Typography>
                    </>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Create Timetable"
                        : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
}
