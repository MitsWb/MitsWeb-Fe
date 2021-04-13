import React from "react";
import BackButton from "../../../buttons/BackButton";
import useHeading from "../../useHeading";
import Attendance from "./AttendaceList";
function ViewClass({ className }) {
  const name = className.split("-");
  useHeading(name[0] + " " + name[1]);
  return (
    <>
      <BackButton />
      <div className="w-full text-center">
        <div>{className}</div>
      </div>
      <Attendance className={name} />
    </>
  );
}

export default ViewClass;
