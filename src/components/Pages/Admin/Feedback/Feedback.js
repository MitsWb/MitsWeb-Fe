import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  postFeebbackCategory,
  getFeebbackCategory,
  updateFeebbackCategory,
} from "../../../../redux/apiActions";
import { CardSkeleton, Notify } from "../../../../utils";
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
} from "@material-ui/core";
import { A } from "hookrouter";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
  const [types, settypes] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  useEffect(() => {
    setloading(true);
    dispatch(getFeebbackCategory()).then((res) => {
      if (res && res.data && res.data.success) {
        settypes(res.data.data || []);
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
        {loading ? (
          <CardSkeleton />
        ) : (
          <Grid container spacing={3}>
            <Grid
              onClick={() => {
                setform(initForm);
                seterror(false);
                setopen(true);
              }}
              key={0}
              item
              xs={6}
              sm={3}
            >
              <A href={`#`}>
                <Card className={classes.paper}>
                  <CardContent>
                    <Typography>
                      New <AddCircleIcon color="primary" />
                    </Typography>
                  </CardContent>
                </Card>
              </A>
            </Grid>
            {types.map((value, key) => {
              return (
                <>
                  <Grid
                    key={key}
                    onClick={() => {
                      seterror(false);
                      setform({ ...value, type: "EDIT" });
                      setopen(true);
                    }}
                    item
                    xs={6}
                    sm={3}
                  >
                    <A href={`#`}>
                      <Card className={classes.paper}>
                        <CardContent>
                          <Typography>{value.category}</Typography>
                        </CardContent>
                      </Card>
                    </A>
                  </Grid>
                </>
              );
            })}
          </Grid>
        )}
      </div>
    </>
  );
};

export default Feedback;
