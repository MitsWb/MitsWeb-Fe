import React from "react";
import { useRoutes } from "hookrouter";
import {
  Dashboard,
  ProfilePage,
  UpdateProfile,
} from "../components/Pages/Student";
import NotFoundPage from "../components/Pages/Shared/NotFoundPage";
import AuthenticatedNavbar from "../components/Navbar/AuthenticatedNavbar";
import RequestLeave from "../components/Features/LeaveApplication/RequestLeave";
import RequestGatePass from "../components/Features/GatePass/RequestGatePass";
import NewGatepass from "../components/Features/GatePass/NewGatpass";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import LeaveDashboard from "../components/Features/LeaveApplication/LeaveDashboard";
import Logout from "../components/Common/Logout";
import PaymentDashboard from "../components/Pages/Payment/PaymentDashboard";

const routes = {
  "/": () => <Dashboard />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/updateprofile": () => <UpdateProfile />,
  "/gatepass": () => <RequestGatePass />,
  "/gatepass/new": () => <NewGatepass />,
  "/leave": () => <LeaveDashboard />,
  "/leave/new": () => <RequestLeave />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
  "/payment": () => <PaymentDashboard />,
  "/logout": () => <Logout />,
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);
  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
