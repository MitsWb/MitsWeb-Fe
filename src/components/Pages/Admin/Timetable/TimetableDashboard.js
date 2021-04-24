import React from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../Shared/useHeading";
import Timetable from "./ViewTimetable";
const TimetableDashboard = () => {
  useHeading("Timetable");

  return (
    <>
      <Addbutton title={"Add Timetable"} href={"/timetable/new"} />
      <Timetable />
    </>
  );
};

export default TimetableDashboard;
