import React from "react";
import Semester from "./Semester";
import { MemoryRouter, Route } from "react-router-dom";
import SemesterInfo from "./SemesterInformation";
import Timetable from "./TimeTable";
function SemesterRoute({ department, semester }) {
  const semesterInfo = (
    <SemesterInfo department={department} semester={semester} />
  );
  const timeTable = <Timetable department={department} semester={semester} />;
  return (
    <>
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
    </>
  );
}

export default SemesterRoute;
