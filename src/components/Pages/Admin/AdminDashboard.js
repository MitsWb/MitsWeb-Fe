import React, { useEffect, useState } from "react";
import useHeading from "../useHeading";
import { useDispatch } from "react-redux";
import {
  getAllusers,
  deleteUser,
  adminUpdateuser,
  getAlladmins,
  getAllfaculties,
} from "../../../redux/apiActions";
//import { navigate } from "hookrouter";
import ConfirmationBox from "./Confirmation";
import Notify from "../../../utils/Notify";
import Loader from "../../../utils/Loader";
import {
  Button,
  Grid,
  Typography,
  DialogActions,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Table,
  // Card,
  TableRow,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Dialog,
  TextField,
  Paper,
  Switch,
  ButtonGroup,
  Box,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  //makeStyles,
  withStyles,
} from "@material-ui/core/styles";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
/*const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  container: {
    marginTop: "10px",
  },
}));*/

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const FormDialog = ({ open, handleClose, id, changeStatus }) => {
  const initForm = {
    name: "",
    email: "",
    mobile: "",
    type: "",
    id: "",
    isHOD: "",
  };
  const initError = {
    name: "",
    email: "",
    mobile: "",
    id: "",
    type: "",
    isHOD: "",
  };
  const [form, setform] = useState(initForm);
  const [err, seterr] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const dispatch = useDispatch();
  const [confOpen, setconfOpen] = useState(false);
  const [data, setdata] = useState("");
  //modal doesn't close after successful updation
  //variable names needs to be improved
  //the list of users should re render after successful updation
  useEffect(() => {
    let mount = true;
    if (mount) {
      setform({
        name: id.name,
        email: id.email,
        mobile: id.mobile,
        type: id.type,
        active: id.active,
        isHOD: id.isHOD,
      });
    }
    return () => {
      mount = false;
    };
  }, [handleClose, id, id.email, id.name, id.mobile]);
  const handleChange = (e) => {
    setnotify({
      popup: false,
    });
    seterr(initError);
    const { value, name } = e.target;
    setform({ ...form, [name]: value });
  };

  const optionalValues = ["email", "type"];

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);
    //const { mobile, email, name, type } = form;
    const { name } = form;
    Object.keys(form).forEach((key) => {
      if (form[key] === "" && !optionalValues.includes(key)) {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    if (!name.replace(/\s/g, "").length) {
      formValid = false;
      err["name"] = "This field is required";
    }

    // if (!phonePreg(mobile)) {
    //   formValid = false;
    //   err["mobile"] = "Enter Valid phone number";
    // }
    // if (type !== "") {
    //   if (isNaN(type) || type === "") {
    //     formValid = false;
    //     err["type"] = "Enter a number";
    //   }
    // }
    // if (email !== "") {
    //   if (!validateEmailAddress(email)) {
    //     err["email"] = "Enter a valid email";
    //     formValid = false;
    //   }
    // }

    seterr(err);
    return formValid;
  };

  const handleSubmit = () => {
    if (validInputs()) {
      let Result;

      Result = {
        ...form,
      };
      handleClose("");
      changeStatus(true, { popup: false });
      dispatch(adminUpdateuser(Result)).then((res) => {
        if (res && res.data) {
          if (res.data.success === true) {
            changeStatus(false, {
              msg: "Updated user",
              type: "success",
              popup: true,
            });
          }
        } else {
          changeStatus(false, {
            msg: "Error",
            type: "error",
            popup: true,
          });
        }
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  const handleUserDelete = (userID) => {
    setconfOpen(false);
    handleClose("DELETING");
    dispatch(deleteUser({ deleteId: userID })).then((res) => {
      if (res && res.data.success) {
        handleClose("DELETED");
      }
    });
  };
  return (
    <>
      <ConfirmationBox
        open={confOpen}
        data={data}
        handleClose={() => {
          setconfOpen(false);
        }}
        handleConfirm={handleUserDelete}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <div className=" flex-column md:flex lg:flex">
            <div className="w-full md:w-3/4 flex lg:w-3/4 text-left">
              <div className="text-sm mr-1 mt-2 md:text-lg lg:text-lg">
                Edit User
              </div>
              <div className="ml-1">
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={form.active}
                      onChange={() => {
                        setform({ ...form, active: !form.active });
                      }}
                      name="checkedB"
                    />
                  }
                  label={form.active ? "Active" : "disabled"}
                />
                {form.type && form.type === "faculty" && (
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={form.isHOD}
                        onChange={() => {
                          setform({ ...form, isHOD: !form.isHOD });
                        }}
                        name="checkedB"
                      />
                    }
                    label={form.isHOD ? "HOD" : "Not HOD"}
                  />
                )}
              </div>
            </div>
            <div className="w-full md:w-1/4 lg:w-1/4 text-right">
              <Button
                size="small"
                color="secondary"
                onClick={() => {
                  setconfOpen(true);
                  setdata({ userId: String(id.id), userName: id.name });
                }}
                style={{ outline: "none", borderRadius: "50%" }}
              >
                <DeleteForeverIcon color="secondary" />
                Delete
              </Button>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                onChange={handleChange}
                label="User Name"
                value={form.name}
                fullWidth
                error={err["name"]}
                helperText={err["name"]}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mobile"
                name="mobile"
                onChange={handleChange}
                label="Mobile Number"
                value={form.mobile}
                fullWidth
                error={err["mobile"]}
                helperText={err["mobile"]}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                onChange={handleChange}
                label="Email"
                value={form.email}
                fullWidth
                error={err["email"]}
                helperText={err["email"]}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="type"
                name="type"
                label="type"
                value={form.type}
                type="text"
                fullWidth
                error={err["type"]}
                helperText={err["type"]}
                autoComplete="type"
              />
            </Grid>
            <Notify props={notify} closeAlert={closeAlert} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{ outline: "none" }}
            onClick={handleSubmit}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  let studentList = useState();
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [Rerender, setRerender] = useState(Math.random());
  const [showType, setshowType] = useState("student");
  const [select, setselect] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    type: "",
    active: "",
    isHOD: "",
  });
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  const changeStatus = (LOADSTATUS, POPUPSTATUS) => {
    // setLoading(LOADSTATUS);
    setnotify(POPUPSTATUS);
    if (POPUPSTATUS.type === "success" && showType === "student") {
      setRerender(Math.random());
    }
    if (POPUPSTATUS.type === "success" && showType === "admin") {
      getAdmin();
    }
    if (POPUPSTATUS.type === "success" && showType === "faculty") {
      getFaculty();
    }
  };
  // eslint-disable-next-line
  const handleClickOpen = (id, e, typeNow) => {
    setselect({
      id: e._id,
      name: e.name,
      email: e.email,
      mobile: e.mobile,
      type: typeNow,
      active: e.active,
      isHOD: e.isHOD,
    });
    setOpen(true);
  };

  const handleClose = (msg) => {
    setOpen(false);
    if (msg === "DELETING") {
      setLoading(true);
    }
    if (msg === "DELETED") {
      setLoading(false);
      setnotify({ msg: "User deleted", type: "success", popup: true });
      setRerender(Math.random());
    }
  };
  useHeading("Admin Dashboard");
  useEffect(() => {
    setLoading(true);
    dispatch(getAllusers()).then((res) => {
      if (res && res.data && res.data.data) {
        setdata(res.data.data);
      }
      setLoading(false);
    });
  }, [dispatch, Rerender]);

  const getAdmin = () => {
    setLoading(true);
    dispatch(getAlladmins()).then((res) => {
      if (res && res.data && res.data.data) {
        setdata(res.data.data);
      }
      setLoading(false);
    });
  };

  const getFaculty = () => {
    setLoading(true);
    dispatch(getAllfaculties()).then((res) => {
      if (res && res.data && res.data.data) {
        setdata(res.data.data);
      }
      setLoading(false);
    });
  };

  if (data.length === 0) {
    studentList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>No Data found</Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    studentList = data.map((e, key) => {
      return (
        <>
          <TableRow
            key={e.id}
            onClick={() => handleClickOpen(e.id, e, showType)}
            hover
          >
            <TableCell
              //  onClick={() => navigate("/hotel/" + e.id)}
              className=" border-b border-gray-200 text-sm "
            >
              <Typography className="items-center">
                <div className="ml-2">{key + 1}</div>
              </Typography>
            </TableCell>
            <TableCell
              //  onClick={() => navigate("/hotel/" + e.id)}
              className=" border-b border-gray-200 text-sm "
            >
              <Typography
                className="items-center"
                color={e.isHOD ? "primary" : "default"}
              >
                <div className="ml-2">{e.name}</div>
              </Typography>
            </TableCell>
            <TableCell
              //     onClick={() => navigate("/hotel/" + e.id)}
              className="border-b border-gray-200 text-sm "
            >
              <Typography
                className="items-center"
                color={e.isHOD ? "primary" : "default"}
              >
                <div className="ml-2">{e.email}</div>
              </Typography>
            </TableCell>
            <TableCell
              //   onClick={() => navigate("/hotel/" + e.id)}
              className=" border-b border-gray-200 text-sm "
            >
              <Typography
                className="items-center"
                color={e.isHOD ? "primary" : "default"}
              >
                <div className="ml-2">{e.type}</div>
              </Typography>
            </TableCell>
          </TableRow>
        </>
      );
    });
  }

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <div>
        <FormDialog
          open={open}
          handleClose={handleClose}
          id={select}
          data={data}
          changeStatus={changeStatus}
        />
        <Box textAlign="center">
          <ButtonGroup
            size="large"
            color="primary"
            aria-label="large outlined primary button group"
          >
            <Button
              variant="outlined"
              size="large"
              color={showType === "student" ? "primary" : "default"}
              onClick={() => {
                setshowType("student");
                setRerender(Math.random());
              }}
            >
              Student
            </Button>
            <Button
              variant="outlined"
              size="large"
              color={showType === "faculty" ? "primary" : "default"}
              onClick={() => {
                setshowType("faculty");
                getFaculty();
              }}
            >
              Faculty
            </Button>
            <Button
              variant="outlined"
              size="large"
              color={showType === "admin" ? "primary" : "default"}
              onClick={() => {
                setshowType("admin");
                getAdmin();
              }}
            >
              Admin
            </Button>{" "}
          </ButtonGroup>
        </Box>
        {/* <Card className="flex mt-3 text-center lg:text-md text-sm w-5/6 flex-row  shadow lg:w-1/2 m-0 m-auto "> */}
        {/* <div className="text-center w-1/3  px-3 py-2 m-1">
            <Button
              variant="contained"
              size="small"
              color={showType === "student" ? "primary" : "default"}
              onClick={() => {
                setshowType("student");
                setRerender(Math.random());
              }}
            >
              Student
            </Button>
          </div> */}
        {/* <div className=" text-center w-1/3  px-1 py-2 m-1">
            <Button
              variant="contained"
              size="small"
              color={showType === "faculty" ? "primary" : "default"}
              onClick={() => {
                setshowType("faculty");
                getFaculty();
              }}
            >
              Faculty
            </Button>
          </div>
          <div className=" text-center w-1/3 px-3 py-2 m-1">
            <Button
              variant="contained"
              size="small"
              color={showType === "admin" ? "primary" : "default"}
              onClick={() => {
                setshowType("admin");
                getAdmin();
              }}
            >
              Admin
            </Button>
          </div> */}
        {/* </Card> */}
        {Loading ? (
          <Loader />
        ) : (
          <div style={{ overflow: "hidden" }}>
            <Paper
              style={{ width: "100%", margin: "0px auto", marginTop: "15px" }}
            >
              <TableContainer style={{ maxHeight: 440 }} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Index</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Type</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={"cursor-pointer"}>
                    {studentList}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        )}{" "}
      </div>
    </>
  );
};
export default AdminDashboard;
