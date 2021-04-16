import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import { AccordionDetails, Grid } from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {
  Typography,
  Divider,
  AccordionActions,
  Button,
  CardContent,
  Card,
  Checkbox,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions({
  Data = [],
  date,
  checked,
  setchecked,
  className,
  handleAttendance,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const periods = [{ time: "9.00-10.00" }, { time: "12.00-1.00" }];

  return (
    <div className={classes.root}>
      <div className="text-center w-full ">
        <Typography>
          Attendace for date : {moment(date).format("MMM Do YY")}
        </Typography>
      </div>

      {periods.length === 0 ? (
        <Card>NO PERIODS ADDED</Card>
      ) : (
        periods.map((periodValue, key) => {
          return (
            <Accordion
              expanded={expanded === periodValue.time}
              onChange={handleChange(periodValue.time)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {" Time: " + periodValue.time}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <Grid container spacing={2}>
                  {Data.map((value, key) => {
                    return (
                      <Grid xs={6} sm={3}>
                        <Card>
                          <CardContent>
                            <div className="flex flex-row">
                              <div className="truncate"> {value.name}</div>
                              <Checkbox
                                checked={
                                  checked[
                                    periodValue.time + "---" + value.email
                                  ] === "true"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  setchecked(periodValue.time, value.email)
                                }
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button
                  onClick={() => handleAttendance(periodValue.time)}
                  size="small"
                  color="primary"
                >
                  Save
                </Button>
              </AccordionActions>
            </Accordion>
          );
        })
      )}
    </div>
  );
}
