import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Stepper, Step, Card } from "@material-ui/core";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import { CalendarToday, GroupAdd } from "@material-ui/icons";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import AttendaceList from "./AttendaceList";
import { getStudents /*, addAttendance*/ } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import Loader from "../../../../utils/Loader";
import useHeading from "../../useHeading";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Choose Date", "Attendance"];
}

function getStepContent(
  step,
  mydata = [],
  date,
  setDate,
  className,
  checked,
  setchecked,
  handleAttendance
) {
  switch (step) {
    case 0:
      return (
        <>
          <div className="m-0 grid grid-cols-1  m-auto">
            <Card style={{ padding: 6 }} className="m-0  m-auto">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="On Date"
                  value={date}
                  style={{ margin: "0px auto" }}
                  onChange={(e) => setDate(e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Card>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <AttendaceList
            Data={mydata}
            date={date}
            className={className}
            checked={checked}
            setchecked={setchecked}
            handleAttendance={handleAttendance}
          />
        </>
      );
    default:
      return "Unknown step";
  }
}

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const branches = ["CE", "ME", "EEE", "ECE", "CSE"];
export default function CustomizedSteppers({ className }) {
  const classes = useStyles();
  useHeading("Attendance");
  const classDetails = className.split("-");
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const [linkValid, setlinkValid] = useState(true);
  const [mystep, setmystep] = useState(0);
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();
  const [date, setDate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState({});

  useEffect(() => {
    var validLink = true;
    setActiveStep(0);
    if (
      !semesters.find((e) => e === Number(classDetails[0][1])) ||
      !classDetails[0][0].toLowerCase() === "s" ||
      !classDetails[0].length === 2 ||
      !branches.find((e) => e === classDetails[1].toUpperCase())
    ) {
      validLink = false;
    }
    setlinkValid(validLink);
    //eslint-disable-next-line
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setmystep(1);
  };

  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
      1: (
        <CalendarToday
          className={"cursor-pointer"}
          onClick={() => setActiveStep(0)}
        />
      ),
      2: <GroupAdd />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const periods = [{ time: "9.00-10.00" }, { time: "12.00-1.00" }];

  if (mystep === 1) {
    setmystep(0);
    setloading(true);
    dispatch(getStudents(classDetails[0][1] + "/" + classDetails[1])).then(
      (res) => {
        if (res && res.data && res.data.data) {
          const studentData = res.data.data;
          let check = {};
          for (let j = 0; j < periods.length; j++) {
            for (var i = 0; i < studentData.length; i++) {
              check = {
                ...check,
                [periods[j].time + "---" + studentData[i].email]: "true",
              };
            }
          }
          setchecked(check);
          setData(res.data.data);
        }
        setloading(false);
      }
    );
  }
  const handleAttendance = (selectedDate) => {
    const keys = Object.keys(checked);
    let result = [];
    for (let i = 0; i < keys.length; i++) {
      var arr = keys[i].split("---");
      if (arr[0] === selectedDate) {
        result = result.concat({ email: arr[1], present: checked[keys[i]] });
      }
    }
    const timeArr = selectedDate.split("-");
    const finalData = {
      startTime: timeArr[0],
      timestamp: date,
      endTime: timeArr[1],
      department: classDetails[1].toUpperCase(),
      semester: Number(classDetails[0][1]),
      period: classDetails[2],
      attendanceList: result,
    };
    console.log(finalData);
    // dispatch(addAttendance()).then((res) => {
    //   console.log(res);
    // });
  };
  const handleCheck = (time, email) => {
    setchecked({
      ...checked,
      [time + "---" + email]:
        checked[time + "---" + email] === "true" ? "false" : "true",
    });
  };
  return (
    <div className={classes.root}>
      {!linkValid ? (
        <>
          <div className="w-full">
            <Card style={{ padding: 6, width: 200, margin: "0px auto" }}>
              Invalid Link!!!
            </Card>
          </div>
        </>
      ) : loading ? (
        <Loader />
      ) : (
        <Card>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="w-full ">
            <div>
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(
                    activeStep,
                    Data,
                    date,
                    setDate,
                    className,
                    checked,
                    handleCheck,
                    handleAttendance
                  )}
                </Typography>
                <div className="m-6">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="contained"
                    color="default"
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={activeStep === 1}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}{" "}
    </div>
  );
}
