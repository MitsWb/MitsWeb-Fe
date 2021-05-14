import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { MemoryRouter, Route } from "react-router-dom";
import SemesterInfo from "./SemesterInformation";
import Timetable from "./TimeTable";
import useHeading from "../Pages/Shared/useHeading";

const SemesterRoute = ({ department, semester }) => {
  useHeading(`Class Dashboard`);
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
  const semesterInfo = (
    <SemesterInfo department={department} semester={semester} />
  );
  const timeTable = <Timetable department={department} semester={semester} />;
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
        <MemoryRouter>
          <Route
            exact
            path="/timetable"
            component={() => <Semester page={timeTable} />}
          />
          <Route
            exact
            path="/"
            component={() => <Semester page={semesterInfo} />}
          />
        </MemoryRouter>
      )}
    </>
  );
};

export default SemesterRoute;
