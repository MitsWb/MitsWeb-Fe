import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLeaves } from "../../../redux/apiActions";
import useHeading from "../Shared/useHeading";
import { Loader, Notify } from "../../../utils";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ViewLeave from "./ViewLeaveapplication";
const columns = [
  { id: "type", label: "Type", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },

  {
    id: "name",
    label: "Name",
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

function LeaveApplications() {
  useHeading("Leaves");
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [Data, setData] = useState([]);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [rerender, setrerender] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getLeaves()).then((res) => {
      if (res && res.data && res.data.data) {
        setRows(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch, rerender]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleLeaveclick = (row) => {
    setData(row);
    setopen(true);
  };
  const handleConfirm = (action) => {
    setopen(false);
    setloading(true);
    dispatch(getLeaves(Data._id + "/" + action)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ msg: res.data.msg, popup: true, type: "success" });
        setrerender(Math.random());
      } else {
        setnotify({ msg: "Error", popup: true, type: "error" });
      }
      setloading(false);
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <ViewLeave
        open={open}
        data={Data}
        handleClose={() => {
          setopen(false);
        }}
        handleConfirm={handleConfirm}
      />
      {loading ? (
        <Loader msg={"Loading leaves"} />
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
                            handleLeaveclick(row);
                          }}
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.label === "Type"
                                  ? value === "fullDay"
                                    ? "Full Day"
                                    : "Half Day"
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
                        Currently there are no leave requests!!
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
      )}
    </>
  );
}

export default LeaveApplications;
