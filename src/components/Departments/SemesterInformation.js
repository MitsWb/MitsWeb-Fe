import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SubjectExamsList from "./Marks/SubjectExamsList";

const useStyles = makeStyles({
  root: {
    width: "auto",
    marginBottom: 10,
  },
});

function SemesterInformation({ department, semester }) {
  const classes = useStyles();
  const [value, setValue] = useState("discussions");
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
        {value === "marks" && (
          <SubjectExamsList department={department} semester={semester} />
        )}
      </>
    </>
  );
}
export default SemesterInformation;
