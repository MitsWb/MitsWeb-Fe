import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  DialogActions,
  Dialog,
  DialogTitle,
  Button,
  TextField,
  DialogContent,
  Grid,
} from "@material-ui/core";
import moment from "moment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ConfirmationBox from "./ConfirmPage";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch } from "react-redux";
import { getUserPasses, editGatepass } from "../../../redux/apiActions";
import { Typography } from "@material-ui/core";
import Loader from "../../../utils/Loader";
import Notify from "../../../utils/Notify";
import GatePassForm from "./GatePassForm";
const columns = [
  { id: "onDate", label: "On\u00a0Date", minWidth: 100 },
  { id: "onTime", label: "On\u00a0Time", minWidth: 100 },

  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  { id: "description", label: "Description", minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const FormDialog = ({ open, handleClose, data, changeStatus }) => {
  console.log(data.time);
  const [Data, setData] = useState();
  const initForm = {
    onDate: moment(data.time).format("MMM Do YY"),
    onTime: moment(data.time).format("h:mm:ss a"),
    description: "",
  };
  const [gatepassForm, setgatepassForm] = useState(initForm);
  const initError = {
    onDate: "",
    onTime: "",
    description: "",
  };
  const [Error, setError] = useState(initError);
  const [date, setDate] = useState(data.time);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [confOpen, setconfOpen] = useState(false);

  useEffect(() => {
    setDate(data.time);
    setData(data);
    setgatepassForm({
      onDate: moment(data.time).format("MMM Do YY"),
      onTime: moment(data.time).format("h:mm:ss a"),
      description: data.description,
      _id: data._id,
    });
    // eslint-disable-next-line
  }, [data.time]);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setgatepassForm({ ...gatepassForm, [name]: value });
  };
  const handleDatechange = (dateNow) => {
    setgatepassForm({
      ...gatepassForm,
      onDate: moment(dateNow).format("MMM Do YY"),
      onTime: moment(dateNow).format("h:mm:ss a"),
    });
    setDate(dateNow);
  };
  const handleSubmit = () => {
    let formValid = true;
    const { description } = gatepassForm;
    if (!description.replace(/\s/g, "").length) {
      formValid = false;
      //err["name"] = "This field is required";
    }
    if (formValid) {
      handleClose();
      changeStatus(true);
      dispatch(editGatepass(gatepassForm)).then((res) => {
        if (res && res.data && res.data.success) {
          changeStatus(false);
        }
      });
    } else alert("err");
  };
  /*const initForm = {
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
  const [select, setselect] = useState({ description: "" });
  const [confOpen, setconfOpen] = useState(false);
  const [data, setdata] = useState("");

  //modal doesn't close after successful updation
  //variable names needs to be improved
  //the list of users should re render after successful updation
  useEffect(() => {
    let mount = true;
    console.log(id);
    if (mount) {
      setform({
        id,
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
      /* dispatch(adminUpdateuser(Result)).then((res) => {
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
    /*   dispatch(deleteUser({ deleteId: userID })).then((res) => {
      if (res && res.data.success) {
        handleClose("DELETED");
      }
    });
  };*/

  return (
    <>
      <ConfirmationBox
        open={confOpen}
        data={{ _id: "jishnu" }}
        handleClose={() => {
          setconfOpen(false);
        }}
        handleConfirm={() => {
          alert("de");
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="w-full md:w-1/4 lg:w-1/4 text-right">
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              setconfOpen(true);
              setData({ _id: String(data._id) });
            }}
            style={{ outline: "none", borderRadius: "50%" }}
          >
            <DeleteForeverIcon color="secondary" />
            Delete
          </Button>
        </div>
        <DialogContent>
          <GatePassForm
            Form={gatepassForm}
            handleChange={handleChange}
            Error={Error}
            Helper={""}
            handleDateChange={handleDatechange}
            handleSubmit={handleSubmit}
            date={date}
            loading={loading}
          />
          {/*    <Grid container spacing={1}>
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
          </Grid>
      
      
     */}{" "}
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const GetUserRequests = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState("");
  const [rerender, setrerender] = useState(false);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  useEffect(() => {
    setLoading(true);
    dispatch(getUserPasses()).then((res) => {
      if (res && res.data && res.data.data) {
        setRows(res.data.data);
      }
      setLoading(false);
    });
  }, [dispatch, rerender]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeStatus = (status) => {
    if (status) {
      setLoading(true);
    } else {
      setLoading(false);
      setnotify({ popup: true, type: "success", msg: "Saved" });
      setrerender(!rerender);
    }
  };
  const closeAlert = () => {
    setnotify({ popup: false });
  };
  console.log(rows);
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={data}
        changeStatus={changeStatus}
      />
      {Loading ? (
        <Loader />
      ) : (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={"cursor-pointer"}>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          onClick={() => {
                            setOpen(true);
                            setdata(row);
                          }}
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className=" border-b border-gray-200 text-center "
                    >
                      <Typography>
                        You have not made any gate pass requests!!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 4, 6]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}{" "}
    </>
  );
};
export default GetUserRequests;
