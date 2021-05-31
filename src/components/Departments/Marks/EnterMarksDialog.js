import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import StudentsTable from "./StudentsTable";
import { useDispatch } from "react-redux";
import { addMarks } from "./../../../redux/apiActions";
import { Loader, Notify } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnterMarksDialog({ open, handleClose, data, type }) {
  const dispatch = useDispatch();
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });

  const handleMarksChange = (e, email) => {
    const name = email;
    setMarks({ ...marks, [name]: e.target.value });
  };
  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };
  const handleSubmit = () => {
    const keys = Object.keys(marks);
    let markList = [];
    var validForm = true;
    if (keys.length === 0) {
      validForm = false;
    }
    for (let i = 0; i < keys.length; i++) {
      if (isNaN(Number(marks[keys[i]])) || isNullOrWhiteSpace(marks[keys[i]])) {
        validForm = false;
        break;
      }
      if (
        !(
          Number(marks[keys[i]]) >= 0 &&
          Number(marks[keys[i]]) <= data.examType.maxMark
        )
      ) {
        validForm = false;
        break;
      }
      markList = markList.concat({
        name: keys[i],
        marks: Number(marks[keys[i]]),
      });
    }
    const body = {
      exam: data._id,
      markList,
    };
    if (validForm) {
      dispatch(addMarks(body)).then((res) => {
        if (res && res.data && res.data.success) {
          setNotify({
            msg: "Marks Entered successfully",
            popup: true,
            type: "success",
          });
          setMarks([]);
        } else {
          if (res && res.data) {
            setNotify({ msg: res.data.msg, popup: true, type: "error" });
          }
        }
        setLoading(false);
        handleClose();
      });
    } else {
      setNotify({ msg: "Error in form ", type: "error", popup: true });
    }
  };

  const classes = useStyles();
  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      {loading ? <Loader /> : null}
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {`${data.subject.name} | ${data.examType.type}`}
              </Typography>
              {type !== "view" && (
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                  save
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <StudentsTable
            handleMarksChange={handleMarksChange}
            maxMark={data.examType.maxMark}
            examId={data._id}
            type={type}
          />
        </Dialog>
      </div>
    </>
  );
}
