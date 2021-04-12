import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AdminDashboard from "../components/Pages/Admin/Admin";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AddUser from "../components/Pages/Admin/AddUser/AddUser";
import Subjects from "../components/Pages/Admin/Subjects";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import Logout from "../components/Common/Logout";

const routes = {
  "/": () => <AdminDashboard />,
  "/user/new": () => <AddUser />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
  "/logout": () => <Logout />,
  "/subjects": () => <Subjects />,
};

const AdminRouter = () => {
  const page = useRoutes(routes);
  return page ? <AdminNavbar page={page} /> : <NotFoundPage />;
};

export default AdminRouter;
