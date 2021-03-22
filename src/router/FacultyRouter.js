import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import FacultyDashboard from "../components/Pages/Faculty/Dashboard";
import FacultyNavbar from "../components/Navbar/FacultyNavbar";
import AddUser from "../components/Pages/Admin/AddUser/AddUser";

const routes = {
  "/": () => <FacultyDashboard />,
  "/adduser": () => <AddUser />,
};

const FacultyRouter = () => {
  const page = useRoutes(routes);
  return page ? <FacultyNavbar page={page} /> : <NotFoundPage />;
};

export default FacultyRouter;
