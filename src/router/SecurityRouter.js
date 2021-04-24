import React from "react";
import Logout from "../components/Common/Logout";
import Dashboard from "../components/Pages/Security/Dashboard";
import Navbar from "../components/Navbar/SecurityNavbar";
import NotFoundPage from "../components/Pages/Shared/NotFoundPage";
import { useRoutes } from "hookrouter";

const routes = {
  "/": () => <Dashboard />,
  "/logout": () => <Logout />,
};
function SecurityRouter() {
  const page = useRoutes(routes);

  return page ? <Navbar page={page} /> : <NotFoundPage />;
}

export default SecurityRouter;
