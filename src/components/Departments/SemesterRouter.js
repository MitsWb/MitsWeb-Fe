import React, { useState, useEffect } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import SemesterInfo from "./SemesterInformation";
import Timetable from "./TimeTable";
import useHeading from "../Pages/Shared/useHeading";
import Drawer from "../Common/Drawer";
import Back from "../buttons/BackButton";

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
  const links = [
    { link: "/", title: "Home" },
    { link: "/timetable", title: "Time table" },
  ];
  return (
    <>
      <Back />
      <div className="sm:mt-0 md:mt-8 lg:mt-8">
        {!linkValid ? (
          <div className="w-full text-center">
            <InvalidLink />
          </div>
        ) : (
          <MemoryRouter>
            <Route
              exact
              path="/timetable"
              component={() => <Drawer page={timeTable} links={links} />}
            />
            <Route
              exact
              path="/"
              component={() => <Drawer page={semesterInfo} links={links} />}
            />
          </MemoryRouter>
        )}
      </div>
    </>
  );
};

export default SemesterRoute;
