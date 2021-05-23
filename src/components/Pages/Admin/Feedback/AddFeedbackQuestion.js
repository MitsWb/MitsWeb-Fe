import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, Grid, LinearProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { postFeedbackQuestions } from "./../../../../redux/apiActions";
import { Notify } from "../../../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  green: {
    color: "#fff",
    backgroundColor: red[500],
  },
}));

export default function AddFeedbackQuestions({ open, handleClose, category }) {
  const classes = useStyles();
  const [question, setQuestion] = useState("");
  const [chipData, setChipData] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleAdd = (prevCount) => {
    setCount(prevCount + 1);
    setChipData([
      ...chipData,
      {
        key: count,
        question: question,
      },
    ]);
    setQuestion("");
  };

  const handleSubmit = () => {
    const body = {
      category: category,
      questions: chipData,
    };
    setLoading(true);
    dispatch(postFeedbackQuestions(body)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ popup: true, msg: "Questions Added!!", type: "success" });
        setChipData([]);
        setCount(0);
        setQuestion("");
      } else {
        setnotify({
          popup: true,
          msg: res.data.msg || "Error",
          type: "error",
        });
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the list of questions as part of feedback. Multiple questions
            can be added at once.
          </DialogContentText>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={question}
                onChange={handleChange}
                label="Question"
                name="question"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() => {
                handleAdd(count);
              }}
            >
              <Avatar className={classes.green} style={{ marginLeft: "8px" }}>
                <AddIcon />
              </Avatar>
            </Grid>
          </Grid>
        </DialogContent>

        {chipData.length > 0 && (
          <Paper component="ul" className={classes.root}>
            {chipData.map((data) => {
              return (
                <li key={data.key}>
                  <Chip
                    label={data.question}
                    onDelete={handleDelete(data)}
                    className={classes.chip}
                    color="primary"
                  />
                </li>
              );
            })}
          </Paper>
        )}

        <DialogActions>
          <Button
            onClick={() => {
              setChipData([]);
              setCount(0);
              setQuestion("");
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
        {loading && <LinearProgress />}
      </Dialog>
    </div>
  );
}
