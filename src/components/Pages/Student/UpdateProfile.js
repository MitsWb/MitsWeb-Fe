import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { updateProfile, getStudent } from "../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { validatePassword, phonePreg } from "../../../utils/validation";
import { Notify, Loader } from "../../../utils";
import UseHeading from "../Shared/useHeading";
import BackButton from "../../buttons/BackButton";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  h5: {
    fontSize: "14px",
    marginTop: "3px",
    marginBottom: "3px",
  },
}));

const UpdateProfile = () => {
  const dispatch = useDispatch();
  UseHeading("Edit Profile");
  const initForm = {
    name: "",
    number: "",
    password: "",
    confirm: "",
    address: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    dob: "",
    bloodGroup: "",
  };
  const initError = {
    name: "",
    number: "",
    password: "",
    confirm: "",
    address: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    dob: "",
    bloodGroup: "",
  };

  const [form, setForm] = useState(initForm);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [Error, setError] = useState(initError);
  const [rerender, setrerender] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getStudent()).then((res) => {
      if (res && res.data && res.data.success) {
        const currentUser = res.data.data;
        const finalForm = {
          name: currentUser.name,
          number: currentUser.mobile,
          password: "",
          confirm: "",
          address: currentUser.address,
          fatherName: currentUser.parentDetails
            ? currentUser.parentDetails.father.name
            : "",
          fatherMobile: currentUser.parentDetails
            ? currentUser.parentDetails.father.mobile
            : "",
          motherName: currentUser.parentDetails
            ? currentUser.parentDetails.mother.name
            : "",
          motherMobile: currentUser.parentDetails
            ? currentUser.parentDetails.mother.mobile
            : "",
          dob: currentUser.dob,
          bloodGroup: currentUser.bloodGroup,
        };
        setForm(finalForm);
      } else {
        setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setloading(false);
    });
  }, [dispatch, rerender]);
  function changeHandler(e) {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { password, confirm, number } = form;
    Object.keys(form).forEach((key) => {
      if (form[key] === "" && (key === "name" || key === "number")) {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    if (!phonePreg(number)) {
      err["number"] = "Invalid Number";
      formValid = false;
    }
    if (password !== "" || confirm !== "") {
      if (password !== confirm) {
        err["confirm"] = "Passwords do not match";
        formValid = false;
      }

      if (password.length < 8) {
        err["password"] = "Must be atleast 8 characters";
        //    formValid = false;
      } else if (password.length > 49) {
        err["password"] = "Maximum 49 characters";
        formValid = false;
      } else if (!validatePassword(password)) {
        err["password"] = "Needed one upper one lower and one digit";
        //  formValid = false;
      }
    }

    setError(err);
    return formValid;
  }

  function submitHandler(e) {
    e.preventDefault();

    if (validInputs()) {
      setloading(true);
      const newForm = {
        name: form.name,
        address: form.address,
        number: form.number,
        dob: form.dob,
        password: form.password,
        confirm: form.confirm,
        bloodGroup: form.bloodGroup,
        parentDetails: {
          father: {
            name: form.fatherName,
            mobile: form.fatherMobile,
          },
          mother: {
            name: form.motherName,
            mobile: form.motherMobile,
          },
        },
      };
      dispatch(updateProfile(newForm)).then((res) => {
        if (res) {
          if (res.data.success) {
            setnotify({
              msg: "Profile updated",
              type: "success",
              popup: true,
            });
          } else {
            setnotify({
              msg: "Error",
              type: "error",
              popup: true,
            });
          }
        }
        setrerender(!rerender);
      });
    }
  }
  const classes = useStyles();
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  return (
    <>
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <form className={classes.form}>
              <TextField
                onChange={changeHandler}
                value={form.name}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                error={Error["name"] ? true : false}
                helperText={Error["name"]}
                autoFocus
              />
              <TextField
                onChange={changeHandler}
                value={form.number}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="number"
                label="Mobile number"
                id="number"
                autoComplete="number"
                error={Error["number"] ? true : false}
                helperText={Error["number"]}
              />
              <TextField
                onChange={changeHandler}
                value={form.address}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                autoComplete="address"
                error={Error["address"] ? true : false}
                helperText={Error["address"]}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={changeHandler}
                    autoComplete="fatherName"
                    name="fatherName"
                    variant="outlined"
                    value={form.fatherName}
                    required
                    fullWidth
                    id="fatherName"
                    label="Father's Name "
                    error={Error["fatherName"] ? true : false}
                    helperText={Error["fatherName"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={changeHandler}
                    autoComplete="fatherMobile"
                    name="fatherMobile"
                    variant="outlined"
                    value={form.fatherMobile}
                    required
                    type="text"
                    fullWidth
                    id="fatherMobile"
                    label="Contact Number"
                    error={Error["fatherMobile"] ? true : false}
                    helperText={Error["fatherMobile"]}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={changeHandler}
                    autoComplete="motherName"
                    name="motherName"
                    variant="outlined"
                    value={form.motherName}
                    required
                    fullWidth
                    id="motherName"
                    label="Mother's Name "
                    error={Error["motherName"] ? true : false}
                    helperText={Error["motherName"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={changeHandler}
                    autoComplete="motherMobile"
                    name="motherMobile"
                    variant="outlined"
                    value={form.motherMobile}
                    required
                    type="text"
                    fullWidth
                    id="motherMobile"
                    label="Contact Number"
                    error={Error["motherMobile"] ? true : false}
                    helperText={Error["motherMobile"]}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={changeHandler}
                    autoComplete="dob"
                    name="dob"
                    variant="outlined"
                    value={form.dob}
                    required
                    fullWidth
                    id="dob"
                    label="Date Of Birth"
                    error={Error["dob"] ? true : false}
                    helperText={Error["dob"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={changeHandler}
                    autoComplete="bloodGroup"
                    name="bloodGroup"
                    variant="outlined"
                    value={form.bloodGroup}
                    required
                    type="text"
                    fullWidth
                    id="bloodGroup"
                    label="Blood Group"
                    error={Error["bloodGroup"] ? true : false}
                    helperText={Error["bloodGroup"]}
                  />
                </Grid>
              </Grid>
              <Typography className={classes.h5} variant="h5">
                Leave blank if no need to change
              </Typography>
              <Grid container spacing={2}>
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
                    label="Password"
                    error={Error["password"] ? true : false}
                    helperText={Error["password"]}
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
                    error={Error["confirm"] ? true : false}
                    helperText={Error["confirm"]}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitHandler}
                style={{ outline: "none" }}
              >
                Update Profile
              </Button>
            </form>
          </div>
        </Container>
      )}{" "}
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default UpdateProfile;
