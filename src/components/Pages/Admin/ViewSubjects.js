import React, { useEffect, useState } from "react";
import useHeading from "../useHeading";
import {
  getAllsubjects,
  editSubject,
  deleteSubject,
} from "../../../redux/apiActions";
import DeleteSubject from "./DeleteSubjectConfirm";
import { useDispatch } from "react-redux";
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
import { Loader, Notify } from "../../../utils";
import SubjectForm from "./SubjectForm";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

const EditSubject = ({
  open,
  handleClose,
  data,
  handleChange,
  handleSubmit,
  loading,
  Error,
  handleDeleteSubject,
}) => {
  const [delOpen, setdelOpen] = useState(false);
  const [ready, setready] = useState(false);

  return (
    <>
      <DeleteSubject
        open={delOpen}
        handleClose={() => setdelOpen(false)}
        subjectName={data.name}
        handleConfirm={() => {
          setdelOpen(false);
          handleDeleteSubject();
        }}
      />
      {open && !ready && <Loader />}
      <Dialog
        open={open}
        onClose={() => {
          setready(false);
          handleClose();
        }}
        className={ready ? "block" : "hidden"}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <SubjectForm
            Form={data}
            handleChange={handleChange}
            Error={Error}
            handleSubmit={() => {
              setready(false);
              handleSubmit();
            }}
            Helper={""}
            title={"Edit Subject"}
            loading={loading}
            ready={() => setready(true)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={() => setdelOpen(true)}
            color="secondary"
          >
            Delete
          </Button>
          <Button
            style={{ outline: "none" }}
            onClick={() => {
              setready(false);
              handleClose();
            }}
            color="primary"
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Subjects = () => {
  useHeading("Subjects");

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "code", label: "Subject Code", minWidth: 100 },

    {
      id: "courseType",
      label: "Type",
      minWidth: 100,
    },
  ];

  const initError = {
    name: "",
    code: "",
    semester: "",
    courseType: "",
    department: "",
  };
  const [Error, setError] = useState(initError);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  const [loading, setloading] = useState(false);
  const [Data, setData] = useState("");
  const [open, setopen] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [rerender, setrerender] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getAllsubjects()).then((res) => {
      if (res && res.data && res.data.data) {
        setrows(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch, rerender]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleDeleteSubject = () => {
    setopen(false);
    setloading(true);
    dispatch(deleteSubject(Data._id)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ msg: res.data.msg, popup: true, type: "success" });
        setrerender(!rerender);
      }
    });
  };
  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    var validForm = true;
    const isNullOrWhiteSpace = (str) => {
      return !str || str.length === 0 || /^\s*$/.test(str);
    };
    Object.keys(Data).forEach((key) => {
      if (isNullOrWhiteSpace(Data[key]) && key !== "__v") {
        validForm = false;
        err[key] = "This field is required";
      }
    });
    setError(err);
    if (validForm) {
      const {
        _id,
        name,
        code,
        department,
        semester,
        courseType,
        taughtBy,
      } = Data;
      setopen(false);
      setloading(true);
      dispatch(
        editSubject({
          _id,
          name,
          code,
          department,
          semester,
          courseType,
          taughtBy: {
            name: taughtBy.name,
            department: taughtBy.department,
            _id: taughtBy._id,
          },
        })
      ).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setnotify({ msg: "Subject updated", popup: true, type: "success" });
            setrerender(!rerender);
          } else {
            setnotify({
              msg: res.data.msg,
              popup: true,
              type: "error",
            });
            setloading(false);
          }
        }
      });
    }
  };
  return (
    <div>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <EditSubject
        handleChange={handleChange}
        data={Data}
        open={open}
        handleSubmit={handleSubmit}
        Error={Error}
        handleClose={() => setopen(false)}
        handleDeleteSubject={handleDeleteSubject}
      />
      {loading ? (
        <Loader />
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
                            setData(row);
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
                      <Typography>No Subjects!!!</Typography>
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

export default Subjects;
