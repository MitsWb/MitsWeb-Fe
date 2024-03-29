import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Stepper, Step, Card } from "@material-ui/core";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import { CalendarToday, GroupAdd } from "@material-ui/icons";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import AttendaceList from "./AttendaceList";
import { getStudents, addAttendance } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Loader, Notify } from "../../../../utils";
import useHeading from "../../Shared/useHeading";
import moment from "moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ClassDetails from "./ClassDetails";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
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
  return ["Choose Date", "Details", "Attendance"];
}

function getStepContent(
  step,
  mydata = [],
  date,
  setDate,
  className,
  checked,
  setchecked,
  handleAttendance,
  classTimings,
  details,
  handleDetails
) {
  switch (step) {
    case 0:
      return (
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
      );
    case 1:
      return <ClassDetails details={details} handleChange={handleDetails} />;
    case 2:
      return (
        <>
          <AttendaceList
            Data={mydata}
            date={date}
            className={className}
            checked={checked}
            setchecked={setchecked}
            handleAttendance={handleAttendance}
            classTimings={classTimings}
          />
        </>
      );
    default:
      return "Unknown step";
  }
}

const AddAttendance = ({ className }) => {
  const classes = useStyles();
  useHeading("Attendance");
  const classDetails = className.split("-");
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const [classTimings, setclassTimings] = useState([]);
  const [mystep, setmystep] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [date, setDate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState({});
  const [notify, setnotify] = useState({ msg: "", popup: "", type: "" });
  const [details, setdetails] = useState({
    deliveryMode: "offline",
    module: "none",
    topic: "",
  });
  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };
  const handleNext = () => {
    if (activeStep === 1) {
      if (details.module === "none") {
        setnotify({
          msg: "please select module",
          popup: true,
          type: "warning",
        });
        return;
      }
      if (isNullOrWhiteSpace(details.topic)) {
        setnotify({ msg: "please fill topic", popup: true, type: "warning" });
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setmystep(activeStep + 1);
  };
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
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
      2: <ImportContactsIcon />,
      3: <GroupAdd />,
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

  if (mystep === 2) {
    setmystep(0);
    const day = moment(date).format("dddd");
    setloading(true);
    dispatch(
      getStudents({
        semester: classDetails[0][1],
        department: classDetails[1],
        day: day.toLowerCase(),
        subjectCode: classDetails[2],
      })
    ).then((res) => {
      if (res && res.data && res.data.success) {
        const { timings } = res.data;
        const studentData = res.data.data;
        let check = {};
        for (let j = 0; j < timings.length; j++) {
          for (var i = 0; i < studentData.length; i++) {
            check = {
              ...check,
              [moment(timings[j].startTime).format("h:mm a") +
              "-" +
              moment(timings[j].endTime).format("h:mm a") +
              "---" +
              studentData[i].email]: "true",
            };
          }
        }
        setchecked(check);
        setclassTimings(timings);

        setData(res.data.data);
      } else {
        if (res && res.data)
          setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setloading(false);
    });
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
    const { module, deliveryMode, topic } = details;
    const finalData = {
      startTime: timeArr[0],
      timeStamp: date,
      endTime: timeArr[1],
      department: classDetails[1].toUpperCase(),
      semester: Number(classDetails[0][1]),
      period: classDetails[2],
      attendanceList: result,
      module,
      deliveryMode,
      topic,
    };

    setloading(true);

    dispatch(addAttendance(finalData)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ msg: res.data.msg, popup: true, type: "success" });
      } else {
        if (res && res.data) {
          setnotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
      setloading(false);
    });
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
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
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
                <div className={classes.instructions}>
                  {getStepContent(
                    activeStep,
                    Data,
                    date,
                    setDate,
                    className,
                    checked,
                    handleCheck,
                    handleAttendance,
                    classTimings,
                    details,
                    handleDetails
                  )}
                </div>
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
                    disabled={activeStep === 2}
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
};

export default AddAttendance;
