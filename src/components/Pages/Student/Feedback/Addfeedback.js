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
import { useDispatch } from "react-redux";
import { postFeedback } from "./../../../../redux/apiActions";
import { Loader, Notify } from "../../../../utils";
import ListQuestions from "./ListQuestion";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Addfeedback = ({ open, id, handleClose, data }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });

  const handleSubmit = () => {
    const keys = Object.keys(feedback);
    if (keys.length > 0) {
      let finalArr = [];
      for (let i = 0; i < keys.length; i++) {
        finalArr = finalArr.concat({
          question: keys[i],
          answer: feedback[keys[i]],
        });
      }
      const Data = {
        questionSet: id,
        faculty: data.taughtBy.email,
        feedback: finalArr,
        code: data.code,
      };
      setLoading(true);

      dispatch(postFeedback(Data)).then((res) => {
        if (res && res.data) {
          setNotify({
            msg: res.data.msg,
            popup: true,
            type: res.data.success ? "success" : "error",
          });
        }
        setLoading(false);
        handleClose();
      });
    } else {
      handleClose();
      setNotify({ msg: "Error!!", type: "error", popup: true });
    }
  };
  const classes = useStyles();
  const [feedback, setfeedback] = useState({});
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
                {`${data.taughtBy ? data.taughtBy.name : ""} | ${data.code}`}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                Submit
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: 50 }}>
            <ListQuestions
              id={id}
              email={data.taughtBy ? data.taughtBy.email : ""}
              subjectCode={data.code}
              addFeedback={(e) => setfeedback(e)}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Addfeedback;
