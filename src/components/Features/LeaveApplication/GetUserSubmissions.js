import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Card,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { TableSkeleton } from "../../../utils";
import Notify from "../../../utils/Notify";
import { getUsersLeave } from "../../../redux/apiActions";
import EditLeaveForm from "./EditLeaveForm";
import { LibraryBooks, Restore } from "@material-ui/icons";

//import { navigate } from "hookrouter";

const fullDaycolumns = [
  { id: "date", label: "From Date", minWidth: 100 },
  { id: "toDate", label: "To Date", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  { id: "description", label: "Reason", minWidth: 170 },
];

const halfDaycolumns = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "fromTime", label: "From Time", minWidth: 100 },
  { id: "toTime", label: "To Time", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  { id: "description", label: "Reason", minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const GetUserSubmissions = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [columns, setcolumn] = useState(fullDaycolumns);
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState("");
  const [rerender, setrerender] = useState(false);
  const [typevalue, setvalue] = useState("fullDay");
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  useEffect(() => {
    setLoading(true);
    dispatch(getUsersLeave()).then((res) => {
      if (res && res.data && res.data.data) {
        const ROWS = res.data.data;
        const selectedRows = ROWS.filter((e) => e.type === typevalue);
        setRows(selectedRows);
      }
      setLoading(false);
    });
  }, [dispatch, rerender, typevalue]);

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
  const handleLeaveApplicationclick = (row) => {
    if (row["status"] !== 1) {
      setOpen(true);
      setdata(row);
    } else {
      //   navigate(`/gatepass/view/${row._id}`);
    }
  };
  const timeConverter = (time) => {
    if (time) {
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? " AM" : " PM";
        time[0] = +time[0] % 12 || 12;
      }
      return time.join("");
    } else return null;
  };
  const dateConverter = (date) => {
    if (date) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const DATE = date.split("-");
      const finalDate =
        DATE[2] + " " + months[Number(DATE[1]) - 1] + " " + DATE[0];
      return finalDate;
    } else {
      return null;
    }
  };
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <EditLeaveForm
        open={open}
        handleClose={handleClose}
        data={data}
        changeStatus={changeStatus}
      />
      <>
        <BottomNavigation
          value={typevalue}
          onChange={(e, val) => {
            setvalue(val);
            val === "fullDay"
              ? setcolumn(fullDaycolumns)
              : setcolumn(halfDaycolumns);
          }}
          className={classes.root}
          showLabels
        >
          <BottomNavigationAction
            label="Full Day"
            value="fullDay"
            icon={<LibraryBooks />}
          />
          <BottomNavigationAction
            label="Half Day"
            value="halfDay"
            icon={<Restore />}
          />
        </BottomNavigation>
      </>
      {Loading ? (
        <TableSkeleton />
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
                            handleLeaveApplicationclick(row);
                          }}
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "status" ? (
                                  <>
                                    {value === 0 && (
                                      <>
                                        <Card
                                          className="h-4 w-4 "
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        ></Card>
                                      </>
                                    )}
                                    {value === 1 && (
                                      <>
                                        <Card
                                          className="h-4 w-4 "
                                          style={{ backgroundColor: "green" }}
                                        ></Card>
                                      </>
                                    )}
                                    {value === -1 && (
                                      <>
                                        <Card
                                          className="h-4 w-4"
                                          style={{ backgroundColor: "red" }}
                                        ></Card>
                                      </>
                                    )}
                                  </>
                                ) : column.id === "fromTime" ||
                                  column.id === "toTime" ? (
                                  timeConverter(value)
                                ) : column.id === "date" ||
                                  column.id === "toDate" ? (
                                  dateConverter(value)
                                ) : (
                                  value
                                )}
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
                        You have not made any leave application submissions!!
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
export default GetUserSubmissions;
