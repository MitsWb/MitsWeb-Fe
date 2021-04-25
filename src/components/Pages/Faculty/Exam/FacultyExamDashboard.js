import React from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../Shared/useHeading";

const FacultyExamDashboard = () => {
  useHeading("Exam");
  return (
    <>
      <Addbutton title={"Add Exams"} href={"/exam/create"} />
    </>
  );
};

export default FacultyExamDashboard;
