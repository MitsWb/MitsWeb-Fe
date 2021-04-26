import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import useHeading from "../Pages/Shared/useHeading";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Marks from "./Marks";

const useStyles = makeStyles({
  root: {
    width: "auto",
    marginBottom: 10,
  },
});

function SemesterInformation({ department, semester }) {
  useHeading(`${department.toUpperCase()} ${semester.toUpperCase()} Dashboard`);
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
        showLabels
      >
        <BottomNavigationAction
          label="Discussions"
          value="discussions"
          icon={<RestoreIcon />}
        />

        <BottomNavigationAction
          label="Marks"
          value="marks"
          icon={<LibraryBooksIcon />}
        />
        <BottomNavigationAction
          label="Notes"
          value="notes"
          icon={<MenuBookIcon />}
        />
      </BottomNavigation>
      {value === "marks" && <Marks />}
    </>
  );
}
export default SemesterInformation;
