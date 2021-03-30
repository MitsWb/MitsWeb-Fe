import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import FacultyDashboard from "../components/Pages/Faculty/Dashboard";
import FacultyNavbar from "../components/Navbar/FacultyNavbar";
import ApproveRequests from "../components/Pages/Faculty/ApproveRequests";

const routes = {
  "/": () => <FacultyDashboard />,
  "/requests": () => <ApproveRequests />,
};

const FacultyRouter = () => {
  const page = useRoutes(routes);
  return page ? <FacultyNavbar page={page} /> : <NotFoundPage />;
};

export default FacultyRouter;
