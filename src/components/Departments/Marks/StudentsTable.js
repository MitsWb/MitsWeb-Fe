import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { findStudents } from "./../../../redux/apiActions";
import { usePath } from "hookrouter";
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
  TextField,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Loader, Notify } from "../../../utils";

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

function StudentsTable({ handleMarksChange, maxMark }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({});
  const [rows, setRows] = useState([]);
  const path = usePath().split("/").reverse();

  useEffect(() => {
    setLoading(true);
    const department = path[1];
    const semester = Number(path[0][1]);
    dispatch(findStudents({ department, semester })).then((res) => {
      if (res && res.data && res.data.success) {
        setRows(res.data.data);
      } else {
        if (res && res.data) {
          setNotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setRows(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "slno", label: "Sl.No", minWidth: 100 },
    { id: "studentId", label: "Reg.No", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "marks", label: "Marks", minWidth: 100 },
    { id: "maxMark", label: "Max Marks", minWidth: 100 },
  ];
  const NoResults = () => {
    return <>No exams found</>;
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setNotify({ popup: false })} />
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
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {/* <div className="truncate"> */}
                                  {column.id === "slno" && index + 1}
                                  {column.label === "Name" && value}
                                  {column.id === "maxMark" && maxMark}
                                  {column.id === "studentId" && value}
                                  {column.id === "marks" && (
                                    <TextField
                                      size="small"
                                      variant="outlined"
                                      style={{ width: 80 }}
                                      onChange={(e) =>
                                        handleMarksChange(e, row.email)
                                      }
                                    />
                                  )}{" "}
                                  {/* </div> */}
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
      )}
    </>
  );
}

export default StudentsTable;
