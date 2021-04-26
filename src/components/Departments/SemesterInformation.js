import React from "react";
import useHeading from "../Pages/Shared/useHeading";

function SemesterInformation({ department, semester }) {
  useHeading(`${department.toUpperCase()} ${semester.toUpperCase()} Dashboard`);
  return (
    <>
      <h1>semester information need to be displayed here</h1>
    </>
  );
}
export default SemesterInformation;
