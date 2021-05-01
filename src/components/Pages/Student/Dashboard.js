import React from "react";
import useHeading from "./../../Pages/Shared/useHeading";
import Calender from "./Calender";
const DashboardPage = () => {
  useHeading("Dashboard");
  return (
    <>
      <Calender />
    </>
  );
};

export default DashboardPage;
