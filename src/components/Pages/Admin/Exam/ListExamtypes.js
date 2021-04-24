import { Loader, Notify } from "../../../../utils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteExam from "./DeleteExamConfirm";
import {
  getExamType,
  editExamType,
  deleteExamType,
} from "../../../../redux/apiActions";
import {
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExamForm from "./ExamForm";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const EditExamtypes = ({
  open,
  handleClose,
  Form,
  handleChange,
  Error,
  handleSubmit,
  loading,
  handleDeleteExam,
}) => {
  const [delOpen, setdelOpen] = useState(false);

  return (
    <>
      <DeleteExam
        open={delOpen}
        handleClose={() => setdelOpen(false)}
        examType={Form.type}
        handleConfirm={() => {
          setdelOpen(false);
          handleDeleteExam();
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <ExamForm
            Form={Form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            title={"Edit Exam Type"}
            loading={loading}
            Error={Error}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            size="small"
            onClick={() => setdelOpen(true)}
            variant="outlined"
            style={{ outline: "none" }}
          >
            Delete
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={handleClose}
            variant="outlined"
            style={{ outline: "none" }}
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const ListExamtypes = () => {
  const dispatch = useDispatch();
  const [rows, setrows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const initForm = {
    type: "",
    maxMark: "",
    passMark: "",
  };

  const initError = {
    type: "",
    maxMark: "",
    passMark: "",
  };
  const [Form, setForm] = useState(initForm);
  const [Error, setError] = useState(initError);
  const [open, setopen] = useState(false);
  const [notify, setnotify] = useState({});
  const [rerender, setrerender] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getExamType()).then((res) => {
      if (res && res.data && res.data.success) {
        setrows(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch, rerender]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "type", label: "Type", minWidth: 100 },
    { id: "maxMark", label: "Max Mark", minWidth: 100 },
    { id: "passMark", label: "Pass Mark", minWidth: 100 },
  ];

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }

      if (isNaN(Form.maxMark)) {
        formValid = false;
        err["maxMark"] = "Must be a number";
      }

      if (isNaN(Form.passMark)) {
        formValid = false;
        err["passMark"] = "Must be a number";
      }
      if (Number(Form.passMark) > Number(Form.maxMark)) {
        formValid = false;
        err["passMark"] = "Cannot be greater than max mark";
      }
    });

    setError(err);

    return formValid;
  };
  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    setError(err);
    if (validInputs()) {
      setopen(false);
      setloading(true);
      const { _id, type, maxMark, passMark } = Form;
      dispatch(editExamType({ _id, type, maxMark, passMark })).then((res) => {
        if (res && res.data && res.data.success) {
          setnotify({ msg: res.data.msg, popup: true, type: "success" });
          setrerender(!rerender);
        } else {
          if (res && res.data) {
            setnotify({ msg: res.data.msg, popup: true, type: "error" });
          }
        }

        setloading(false);
      });
    }
  };
  const handleDeleteExam = () => {
    setopen(false);
    dispatch(deleteExamType(Form._id)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ msg: res.data.msg, popup: true, type: "success" });
        setrerender(!rerender);
      } else {
        if (res && res.data) {
          setnotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
    });
  };
  return (
    <div>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <EditExamtypes
        open={open}
        handleClose={() => setopen(false)}
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        handleSubmit={handleSubmit}
        loading={loading}
        handleDeleteExam={handleDeleteExam}
      />
      {loading ? (
        <Loader msg={"Loading Exam List"} />
      ) : (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
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
                            setForm(row);
                            setopen(true);
                          }}
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
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
                      <Typography>No Exam types!!!</Typography>
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
    </div>
  );
};

export default ListExamtypes;
