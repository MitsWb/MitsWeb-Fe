import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExams, editExam } from "../../../../redux/apiActions";
import Edit from "./EditExam";
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
import useHeading from "../../Shared/useHeading";
import { Loader, Notify } from "../../../../utils";
import BackButton from "../../../buttons/BackButton";
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
    marginTop: 30,
  },
  container: {
    maxHeight: 440,
  },
});

const EditExam = ({ Data, open, handleClose, handleSubmit }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <Edit handleSubmit={handleSubmit} examId={Data} />
      </DialogContent>
      <DialogActions>
        <Button
          style={{ outline: "none" }}
          // onClick={() => setdelOpen(true)}
          color="secondary"
        >
          Delete
        </Button>
        <Button
          style={{ outline: "none" }}
          onClick={() => {
            handleClose();
          }}
          color="primary"
        >
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};
function ViewExamtype({ typeId }) {
  useHeading("Exam List");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const [notify, setnotify] = useState({});
  const [Data, setData] = useState([]);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);
  const [rerender, setrerender] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getExams(typeId)).then((res) => {
      if (res && res.data && res.data.success) {
        setrows(res.data.data);
      } else {
        if (res && res.data) {
          setnotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
      setloading(false);
    });
  }, [dispatch, typeId, rerender]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setrows(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };*/
  const columns = [
    { id: "subject", label: "Subject Name", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },

    {
      id: "subject",
      label: "Type",
      minWidth: 100,
    },
  ];
  const NoResults = () => {
    return <>No exams found</>;
  };

  const handleEdit = (Form) => {
    setopen(false);
    setloading(true);
    dispatch(editExam(Form)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ msg: res.data.msg, popup: true, type: "success" });
      } else if (res && res.data) {
        setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setrerender(!rerender);
      setloading(false);
    });
  };
  return (
    <>
      <BackButton />
      <EditExam
        handleSubmit={handleEdit}
        Data={Data}
        open={open}
        handleClose={() => setopen(false)}
      />
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
        <Loader />
      ) : rows.length === 0 ? (
        <div className="w-full text-center">
          <NoResults />
        </div>
      ) : (
        <div className="mt-10">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, key) => (
                      <StyledTableCell
                        key={key}
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            onClick={() => {
                              setData(row._id);
                              setopen(true);
                            }}
                            tabIndex={-1}
                            key={row._id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <p className="truncate">
                                    {column.label === "Subject Name" &&
                                      value.name}
                                    {column.label === "Date" && value}
                                    {column.label === "Type" &&
                                      value.courseType}
                                  </p>
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
        </div>
      )}{" "}
    </>
  );
}

export default ViewExamtype;
