import React from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../useHeading";

const ExamDashboard = () => {
  useHeading("Exam");
  return (
    <>
      <Addbutton title={"Add Exam Types"} href={"/exam/createtypes"} />
    </>
  );
};

export default ExamDashboard;
