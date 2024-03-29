import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  postFeebbackCategory,
  getFeebbackCategory,
  updateFeebbackCategory,
  changeStat,
  deleteFeedback,
} from "../../../../redux/apiActions";
import { IOS } from "../../../Common/Switch";
import { CardSkeleton, Notify } from "../../../../utils";
import Skeleton from "@material-ui/lab/Skeleton";
import Delete from "./Delete";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
  CardActions,
  Divider,
  Chip,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddFeedbackQuestions from "./AddFeedbackQuestion";
import { DeleteForever } from "@material-ui/icons";
const NewCategory = ({
  open,
  handleClose,
  handleChange,
  form,
  handleSubmit,
  error,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <DialogTitle>{form.type} CATEGORY</DialogTitle>
        <Grid xs={12} sm={6} item>
          <TextField
            label="Category"
            id="outlined-margin-dense"
            margin="normal"
            variant="outlined"
            name="code"
            style={{ width: 200 }}
            value={form.category}
            onChange={(e) => handleChange(e.target.value)}
            error={error}
            helperText={error && "Cannot be empty"}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={handleClose}
          style={{ outline: "none" }}
        >
          Back
        </Button>
        <Button
          style={{ outline: "none" }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    top: theme.spacing(15),
    left: theme.spacing(35),
  },
}));
const isNullOrWhiteSpace = (str) => {
  return !str || str.length === 0 || /^\s*$/.test(str);
};
const Feedback = () => {
  const initForm = { type: "NEW", category: "", _id: "" };
  const [form, setform] = useState(initForm);
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const classes = useStyles();
  const [checked, setchecked] = useState(false);
  const [types, settypes] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [deleteData, setdeleteData] = useState({ open: false, data: "" });
  useEffect(() => {
    setloading(true);
    dispatch(getFeebbackCategory()).then((res) => {
      if (res && res.data && res.data.success) {
        settypes(res.data.data || []);
        setchecked(res.data.status);
      }
      setloading(false);
    });
  }, [dispatch, rerender]);

  const handleSubmit = () => {
    if (isNullOrWhiteSpace(form.category)) {
      seterror(true);
    } else {
      setloading(true);
      setopen(false);
      dispatch(postFeebbackCategory({ category: form.category })).then(
        (res) => {
          if (res && res.data && res.data.success) {
            setnotify({ popup: true, msg: "Category added", type: "success" });
          } else {
            setnotify({
              popup: true,
              msg: res.data.msg || "Error",
              type: "error",
            });
          }
          setrerender(!rerender);
        }
      );
    }
  };

  const handleEdit = () => {
    if (isNullOrWhiteSpace(form.category)) {
      seterror(true);
    } else {
      setopen(false);
      setloading(true);
      const { _id, category } = form;
      dispatch(updateFeebbackCategory({ _id, category })).then((res) => {
        if (res && res.data && res.data.success) {
          setnotify({ popup: true, msg: res.data.msg, type: "success" });
        } else {
          setnotify({
            popup: true,
            msg: res.data.msg || "Error",
            type: "error",
          });
        }
        setrerender(!rerender);
      });
    }
  };

  const handleCheck = () => {
    setchecked(!checked);
    dispatch(changeStat(["feedback", Number(!checked)])).then((res) => {
      if (res && res.data) {
        setnotify({
          msg: res.data.msg,
          popup: true,
          type: res.data.success ? "success" : "error",
        });
      }
    });
  };
  const [quesCatg, setQuesCatg] = useState("");
  const handleQuestionsOpen = (category) => {
    setQuesCatg(category);
    setQuestionsOpen(true);
  };

  const handleQuestionsClose = () => {
    setQuestionsOpen(false);
  };
  const handleDelete = () => {
    setloading(true);
    const { _id } = deleteData.data;
    setdeleteData({ ...deleteData, open: false });
    dispatch(deleteFeedback(_id)).then((res) => {
      if (res && res.data) {
        const success = res.data.success ? true : false;
        setnotify({
          type: success ? "success" : "error",
          msg: success
            ? (deleteData.data.category || "") + " deleted !"
            : res.data.msg,
          popup: true,
        });
      }
      setrerender(!rerender);
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="mt-2">
        <NewCategory
          error={error}
          open={open}
          handleChange={(e) => {
            seterror(false);
            setform({ ...form, category: e });
          }}
          form={form}
          handleSubmit={() =>
            form.type === "NEW" ? handleSubmit() : handleEdit()
          }
          handleClose={() => setopen(false)}
        />
        <AddFeedbackQuestions
          open={questionsOpen}
          handleClose={handleQuestionsClose}
          category={quesCatg}
        />

        {loading ? (
          <>
            <div className="w-full  mb-5">
              <Skeleton
                variant="rect"
                width={150}
                height={45}
                style={{ margin: "0px auto" }}
                animation="wave"
              />
            </div>
            <div className="mt-10">
              <CardSkeleton xs={12} height={150} />
            </div>
          </>
        ) : (
          <>
            <Delete
              data={deleteData.data}
              open={deleteData.open}
              handleClose={() => setdeleteData({ ...deleteData, open: false })}
              handleDelete={handleDelete}
            />
            <div style={{ marginBottom: "15px" }}>
              <Card
                style={{ width: 150, textAlign: "center", margin: "0px auto" }}
              >
                <IOS
                  checked={checked}
                  handleChange={handleCheck}
                  label={checked ? "Active" : "Inactive"}
                />
              </Card>
            </div>
            <Grid container spacing={3}>
              <Grid
                item
                onClick={() => {
                  setform(initForm);
                  seterror(false);
                  setopen(true);
                }}
              >
                <Chip
                  checked={checked}
                  avatar={<Avatar>+</Avatar>}
                  label="New Category"
                  clickable
                  color="primary"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {types.map((value, key) => {
                return (
                  <>
                    <Grid key={key} item xs={12} sm={3}>
                      <Card className={classes.paper}>
                        <CardContent className="flex flex-row">
                          <div className="w-4/5">
                            <Typography className="truncate">
                              {value.category}
                            </Typography>
                          </div>
                          <div className="w-1/5 text-right">
                            <IconButton
                              onClick={() =>
                                setdeleteData({
                                  data: value,
                                  open: true,
                                })
                              }
                              style={{ outline: "none" }}
                            >
                              <DeleteForever
                                color="secondary"
                                className="t-0 r-0 absolute"
                              />
                            </IconButton>
                          </div>
                        </CardContent>
                        <Divider />
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              seterror(false);
                              setform({ ...value, type: "EDIT" });
                              setopen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleQuestionsOpen(value._id)}
                          >
                            Add Questions
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </>
        )}
      </div>
    </>
  );
};

export default Feedback;
