import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AdminDashboard from "../components/Pages/Admin/AdminDashboard";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AddUser from "../components/Pages/Admin/AddUser/AddUser";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";

const routes = {
  "/": () => <AdminDashboard />,
  "/adduser": () => <AddUser />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
};

const AdminRouter = () => {
  const page = useRoutes(routes);
  return page ? <AdminNavbar page={page} /> : <NotFoundPage />;
};

export default AdminRouter;
