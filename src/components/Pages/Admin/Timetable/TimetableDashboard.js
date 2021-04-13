import React from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../useHeading";

const TimetableDashboard = () => {
  useHeading("Timetable");
  return (
    <>
      <Addbutton title={"Add Timetable"} href={"/timetable/new"} />
    </>
  );
};

export default TimetableDashboard;
