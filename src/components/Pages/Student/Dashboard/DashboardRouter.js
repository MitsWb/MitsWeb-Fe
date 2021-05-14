import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import useHeading from "../../Shared/useHeading";
import Drawer from "../../../Common/Drawer";
import Dashboard from "./Dashboard";
import Timetable from "./TimeTable";

const SemesterRoute = ({ department, semester }) => {
  useHeading(`Class Dashboard`);

  const links = [
    { link: "/", title: "Home" },
    { link: "/timetable", title: "Timetable" },
  ];
  return (
    <>
      <MemoryRouter>
        <Route
          exact
          path="/"
          component={() => <Drawer page={<Dashboard />} links={links} />}
        />
        <Route
          exact
          path="/timetable"
          component={() => <Drawer page={<Timetable />} links={links} />}
        />
      </MemoryRouter>
    </>
  );
};

export default SemesterRoute;
