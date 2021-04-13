import React, { useEffect, useState } from "react";
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
import { getStudents } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
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

export default function ControlledAccordions({ className }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const [checked, setchecked] = useState(true);
  useEffect(() => {
    dispatch(getStudents(className[0][1] + "/" + className[1])).then((res) => {
      if (res && res.data && res.data.data) {
        setData(res.data.data);
      }
    });
  }, [dispatch, className]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const periods = [
    { name: "Data Stucture", time: "9.00-10.00" },
    { name: "Computer", time: "10.00-11.00" },
    { name: "Maths", time: "11.10-12.00" },
    { name: "Chemistry", time: "12.45-1.30" },
    { name: "Physics", time: "1.30-2.30" },
  ];

  return (
    <div className={classes.root}>
      {periods.length === 0 ? (
        <Card>NO PERIODS ADDED</Card>
      ) : (
        periods.map((value, key) => {
          return (
            <Accordion
              expanded={expanded === value.name}
              onChange={handleChange(value.name)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {value.name + " Time: " + value.time}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    Student Attendance
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
                            {value.name}
                            <Checkbox
                              checked={checked}
                              onChange={() => setchecked(!checked)}
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
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
                <Button size="small" color="primary">
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
