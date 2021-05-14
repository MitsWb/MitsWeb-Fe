import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
//import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, Card, CardContent } from "@material-ui/core";
import TableSkeleton from "../../../../utils/TableSkeleton";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const RealTimetable = ({ rows, loading }) => {
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.day}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Card>
                      <CardContent>{row.day.toUpperCase()}</CardContent>
                    </Card>
                  </StyledTableCell>
                  {row.timings.map((time) => (
                    <StyledTableCell align="center">
                      <Card>
                        <CardContent>
                          {time.subject}
                          <br></br>
                          {moment(time.startTime).format("h:mm a") +
                            "-" +
                            moment(time.endTime).format("h:mm a")}
                        </CardContent>
                      </Card>
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default RealTimetable;
