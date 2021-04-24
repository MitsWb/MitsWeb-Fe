import React from "react";
import { useRoutes } from "hookrouter";
import {
  HomePage,
  AboutPage,
  LoginPage,
  RegisterPage,
  ForgotPassword,
} from "../components/Pages/Public";
import NotFoundPage from "../components/Pages/Shared/NotFoundPage";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import Logout from "../components/Common/Logout";

const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/login": () => <LoginPage />,
  "/register": () => <RegisterPage />,
  "/reset-password": () => <ForgotPassword />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
  "/logout": () => <Logout />,
};

const PublicRouter = () => {
  const page = useRoutes(routes);

  return page ? <PublicNavbar page={page} /> : <NotFoundPage />;
};

export default PublicRouter;
