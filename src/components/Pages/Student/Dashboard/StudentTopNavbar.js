import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EventIcon from "@material-ui/icons/Event";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ShowResources from "../../CourseResources/ShowResources";
import EventsCalendar from "../../../Features/Events/EventsCalendar";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TimeTable from "./TimeTable";

const useStyles = makeStyles({
  root: {
    width: "auto",
    marginBottom: 10,
  },
});

function StudentTopNavbar() {
  const classes = useStyles();
  const [value, setValue] = useState("events");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.root}
          showLabels
        >
          <BottomNavigationAction
            label="Events"
            value="events"
            icon={<EventIcon />}
          />

          <BottomNavigationAction
            label="Timetable"
            value="timetable"
            icon={<AccessTimeIcon />}
          />
          <BottomNavigationAction
            label="Notes"
            value="notes"
            icon={<MenuBookIcon />}
          />
        </BottomNavigation>
        {value === "notes" && <ShowResources />}
        {value === "timetable" && <TimeTable />}
        {value === "events" && <EventsCalendar />}
      </>
    </>
  );
}
export default StudentTopNavbar;
