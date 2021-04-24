import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGatepasses } from "../../../redux/apiActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Card } from "@material-ui/core";
import { Loader, Notify } from "../../../utils";
import useHeading from "../useHeading";
import Confirmation from "./Confirmation";
import moment from "moment";

const columns = [
  { id: "time", label: "On\u00a0Date", minWidth: 100 },
  { id: "time", label: "On\u00a0Time", minWidth: 100 },

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

function GetGatePassRequests() {
  useHeading("Approve Requests");
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState("");
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [open, setopen] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getGatepasses()).then((res) => {
      if (res && res.data && res.data.data) {
        setDisplay(res.data.success);
        setRows(res.data.data);
      }
      setLoading(false);
    });
  }, [dispatch, rerender]);

  const getDetails = (passId) => {
    setLoading(true);
    dispatch(getGatepasses(passId)).then((res) => {
      if (res && res.data && res.data.data) {
        setData(res.data.data);
        setopen(true);
      }

      setLoading(false);
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleConfirm = (status) => {
    setopen(false);
    setLoading(true);
    dispatch(getGatepasses(Data._id + "/" + status)).then((res) => {
      if (res && res.data && res.data.success) {
        setnotify({ msg: res.data.msg, popup: true, type: "success" });
        setrerender(!rerender);
      } else {
        setnotify({ msg: "Error", popup: true, type: "error" });
      }
      setLoading(false);
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <Confirmation
        open={open}
        data={Data}
        handleClose={() => {
          setopen(false);
        }}
        handleConfirm={handleConfirm}
      />
      {Loading ? (
        <Loader msg={"Loading gatepasses..."} />
      ) : display ? (
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
              <TableBody>
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
                          className={"cursor-pointer"}
                          onClick={() => getDetails(row._id)}
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
                                          style={{ backgroundColor: "yellow" }}
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
                                ) : column.label === "On\u00a0Date" ? (
                                  moment(value).format("MMM Do YY")
                                ) : column.label === "On\u00a0Time" ? (
                                  moment(value).format("h:mm a")
                                ) : column.format &&
                                  typeof value === "number" ? (
                                  column.format(value)
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
                        Currently no gatepass requests to be displayed!!
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
      ) : (
        <h1>Currently no requests to be approved!!</h1>
      )}
    </>
  );
}

export default GetGatePassRequests;
