import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { A } from "hookrouter";
import { register } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import {
  //validateEmailAddress,
  //validatePassword,
  phonePreg,
} from "../../../../utils/validation";
import Notify from "../../../../utils/Notify";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -5,
    marginLeft: -1,
  },
}));

const LoaderButton = ({ Loading, handleSubmit }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      if (!Loading) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    return () => {
      mount = false;
    };
  }, [Loading]);

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        Register
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const initForm = {
    email: "",
    password: "",
    number: "",
    name: "",
    confirm: "",
    type: "student",
    oldpassword: "",
  };
  const initError = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    oldnumber: "",
  };
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(initError);
  const [loading, setloading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });

  function changeHandler(e) {
    const { name, value } = e.target;
    const fieldValue = { ...form };
    fieldValue[name] = name === "email" ? value.toLowerCase() : value;
    setError(initError);
    setForm(fieldValue);
  }

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { password, confirm, number } = form;
    const isNullOrWhiteSpace = (str) => {
      return !str || str.length === 0 || /^\s*$/.test(str);
    };
    Object.keys(form).forEach((key) => {
      if (isNullOrWhiteSpace(form[key])) {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    if (password !== confirm) {
      err["confirm"] = "Passwords do not match";
      formValid = false;
    }
    /*if (!validateEmailAddress(email)) {
      err["email"] = "Enter a valid email";
      formValid = false;
    }*/
    if (!phonePreg(number)) {
      err["number"] = "Invalid Number";
      formValid = false;
    }
    /*  if (password.length < 8) {
      err["password"] = "Must be atleast 8 characters";
      formValid = false;
    } else if (password.length > 49) {
      err["password"] = "Maximum 49 characters";
      formValid = false;
    } else if (!validatePassword(password)) {
      err["password"] = "Needed one upper one lower and one digit";
      formValid = false;
    }*/

    setError(err);
    return formValid;
  }

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  function submitHandler(e) {
    e.preventDefault();
    if (validInputs()) {
      setloading(true);
      dispatch(register(form)).then((res) => {
        if (res && res.data) {
          setloading(false);
          if (res.data.success === true) {
            setnotify({
              msg: "Regsitration success",
              type: "success",
              popup: true,
            });
            setForm(initForm);
          } else {
            setloading(false);
            setnotify({
              msg: res.data.msg,
              type: "error",
              popup: true,
            });
          }
        }
        setloading(false);
      });
    }
  }

  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  value={form.name}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="fname"
                  name="number"
                  variant="outlined"
                  value={form.number}
                  required
                  fullWidth
                  id="number"
                  label="Mobile Number"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  variant="outlined"
                  value={form.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="oldpassword"
                  name="oldpassword"
                  variant="outlined"
                  value={form.oldpassword}
                  required
                  fullWidth
                  type="password"
                  id="oldpassword"
                  label="Old password"
                  error={error["oldpassword"] ? true : false}
                  helperText={error["oldpassword"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="password"
                  name="password"
                  variant="outlined"
                  value={form.password}
                  required
                  type="password"
                  fullWidth
                  id="password"
                  label="New Password"
                  error={error["password"] ? true : false}
                  helperText={error["password"]}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      submitHandler(event);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="confirm"
                  name="confirm"
                  variant="outlined"
                  value={form.confirm}
                  required
                  type="password"
                  fullWidth
                  id="confirm"
                  label="Confirm Password"
                  error={error["confirm"] ? true : false}
                  helperText={error["confirm"]}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      submitHandler(event);
                    }
                  }}
                />
              </Grid>
            </Grid>
            {/* <Button
              type="submit"
              style={{ outline: "none" }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button> */}
            <LoaderButton Loading={loading} handleSubmit={submitHandler} />
            <Grid container justify="flex-end">
              <Grid item>
                <A href="/" className={classes.link}>
                  <Link component="button" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </A>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default Register;
