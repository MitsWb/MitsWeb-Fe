import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import FacultyDashboard from "../components/Pages/Faculty/Dashboard";
import FacultyNavbar from "../components/Navbar/FacultyNavbar";
import ApproveRequests from "../components/Pages/Faculty/ApproveRequests";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import Logout from "../components/Common/Logout";

const routes = {
  "/": () => <FacultyDashboard />,
  "/requests": () => <ApproveRequests />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
  "/logout": () => <Logout />,
};

const FacultyRouter = () => {
  const page = useRoutes(routes);
  return page ? <FacultyNavbar page={page} /> : <NotFoundPage />;
};

export default FacultyRouter;
