import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  DialogActions,
  Dialog,
  Button,
  DialogContent,
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
import {
  getUserPasses,
  editGatepass,
  cancelGatepass,
} from "../../../redux/apiActions";
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
  const loading = false;
  const dispatch = useDispatch();
  const [confOpen, setconfOpen] = useState(false);

  useEffect(() => {
    setDate(data.time);
    setData(data._id);
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
          changeStatus(false, "Gate Pass updated");
        }
      });
    } else alert("err");
  };

  const handleUserDelete = () => {
    setconfOpen(false);
    handleClose();
    dispatch(cancelGatepass({ deleteId: Data })).then((res) => {
      if (res && res.data && res.data.success) {
        changeStatus(false, "Deleted");
        // handleClose("DELETED", 1);
      } else {
        changeStatus(false, "An error occured", "error");
      }
    });
  };

  return (
    <>
      <ConfirmationBox
        open={confOpen}
        data={{ _id: "jishnu" }}
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
        <div className="w-full md:w-1/4 lg:w-1/4 text-right">
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              setconfOpen(true);
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
            title="Edit Gate Pass"
            handleDateChange={handleDatechange}
            handleSubmit={handleSubmit}
            date={date}
            loading={loading}
          />
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
  const changeStatus = (status, notify, succ = "success") => {
    if (status) {
      setLoading(true);
    } else {
      setLoading(false);
      setnotify({ popup: true, type: succ, msg: notify });
      setrerender(!rerender);
    }
  };
  const closeAlert = () => {
    setnotify({ popup: false });
  };
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
