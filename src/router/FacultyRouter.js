import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import FacultyDashboard from "../components/Pages/Faculty/Dashboard";
import FacultyNavbar from "../components/Navbar/FacultyNavbar";
import ApproveRequests from "../components/Pages/Faculty/ApproveRequests";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import Logout from "../components/Common/Logout";
import SemestersList from "../components/Departments/SemestersList";
import Leave from "../components/Pages/Faculty/LeaveApplications";
import MyClasses from "../components/Pages/Faculty/Class/MyClasses";
import Steps from "../components/Pages/Faculty/Class/Steps";
const routes = {
  "/": () => <FacultyDashboard />,
  "/requests": () => <ApproveRequests />,
  "/leave": () => <Leave />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
  "/logout": () => <Logout />,
  "/:department/semesters": () => <SemestersList />,
  "/class": () => <MyClasses />,
  "/class/:className": ({ className }) => <Steps className={className} />,
};

const FacultyRouter = () => {
  const page = useRoutes(routes);
  return page ? <FacultyNavbar page={page} /> : <NotFoundPage />;
};

export default FacultyRouter;
