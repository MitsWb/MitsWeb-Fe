import React from "react";
import DepartmentsList from "../../Departments/DepartmentsList";
import useHeading from "../Shared/useHeading";

function Dashboard() {
  useHeading("Dashboard");
  return (
    <div>
      <DepartmentsList />
    </div>
  );
}

export default Dashboard;
