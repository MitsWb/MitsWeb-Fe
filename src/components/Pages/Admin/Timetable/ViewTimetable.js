import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTimetable } from "../../../../redux/apiActions";
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
  /*Dialog,
  DialogActions,
  DialogContent,*/
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { TableSkeleton } from "../../../../utils";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { navigate } from "hookrouter";
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
function ViewTimetable() {
  const dispatch = useDispatch();
  const [rows, setrows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getTimetable()).then((res) => {
      if (res && res.data && res.data.success) {
        setrows(res.data.data || []);
      }
      setloading(false);
    });
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "department", label: "Dept", minWidth: 100 },
    { id: "semester", label: "Semester", minWidth: 100 },
    { id: "delete", label: "Delete", minWidth: 100 },
  ];

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };*/

  return (
    <div>
      {loading ? (
        <TableSkeleton />
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
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                onClick={() => {
                                  if (!(column.id === "delete"))
                                    navigate("/timetable/" + row._id);
                                  //setData(row);
                                  //setopen(true);
                                }}
                                key={column.id}
                                align={column.align}
                              >
                                {column.id === "delete" && (
                                  <IconButton style={{ outline: "none" }}>
                                    <DeleteForeverIcon />
                                  </IconButton>
                                )}
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
                      <Typography>No Timetables!!!</Typography>
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
}

export default ViewTimetable;
