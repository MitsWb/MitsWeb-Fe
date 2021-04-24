import React from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../Shared/useHeading";
import ListExamTypes from "./ListExamtypes";
const ExamDashboard = () => {
  useHeading("Exam");
  return (
    <>
      <Addbutton title={"Add Exam Types"} href={"/exam/createtypes"} />
      <ListExamTypes />
    </>
  );
};

export default ExamDashboard;
