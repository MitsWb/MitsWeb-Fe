import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import useHeading from "../Pages/Shared/useHeading";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SubjectExamsList from "./Marks/SubjectExamsList";

const useStyles = makeStyles({
  root: {
    width: "auto",
    marginBottom: 10,
  },
});

function SemesterInformation({ department, semester }) {
  useHeading(`Class Dashboard`);
  const classes = useStyles();
  const [value, setValue] = useState("discussions");
  const [linkValid, setlinkValid] = useState(false);
  const semesters = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
  const departments = ["ce", "me", "eee", "ece", "cse"];
  useEffect(() => {
    if (
      semesters.find((e) => e === semester.toLowerCase()) &&
      departments.find((e) => e === department.toLowerCase())
    ) {
      setlinkValid(true);
    }
  }, [department, departments, semester, semesters]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const InvalidLink = () => {
    return <>Invalid Link</>;
  };
  return (
    <>
      {!linkValid ? (
        <div className="w-full text-center">
          <InvalidLink />
        </div>
      ) : (
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
      )}
    </>
  );
}
export default SemesterInformation;
