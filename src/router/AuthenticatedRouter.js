import React from "react";
import { useRoutes } from "hookrouter";
import Dashboard from "../components/Pages/Dashboard";
import ProfilePage from "../components/Pages/ProfilePage";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AuthenticatedNavbar from "../components/Navbar/AuthenticatedNavbar";
import RequestLeave from "../components/Features/LeaveApplication/RequestLeave";
import RequestGatePass from "../components/Features/GatePass/RequestGatePass";
import UpdateProfile from "../components/Pages/UpdateProfile";
import NewGatepass from "../components/Features/GatePass/NewGatpass";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
const routes = {
  "/": () => <Dashboard />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/updateprofile": () => <UpdateProfile />,
  "/leave": () => <RequestLeave />,
  "/gatepass": () => <RequestGatePass />,
  "/gatepass/new": () => <NewGatepass />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);
  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
