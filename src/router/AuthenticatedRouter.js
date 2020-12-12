import React from "react";
import { useRoutes } from "hookrouter";
import Dashboard from "../components/Pages/Dashboard";
import ProfilePage from "../components/Pages/ProfilePage";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AuthenticatedNavbar from "../components/Navbar/AuthenticatedNavbar";
import RequestLeave from "../components/Features/LeaveApplication/RequestLeave";

const routes = {
  "/": () => <Dashboard />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/leave": () => <RequestLeave />,
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);
  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
