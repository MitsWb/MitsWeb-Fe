import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AdminDashboard from "../components/Pages/Admin/Admin";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AddUser from "../components/Pages/Admin/AddUser/AddUser";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import Logout from "../components/Common/Logout";
import TimetableDashboard from "../components/Pages/Admin/Timetable/TimetableDashboard";
import CreateTimeTableForm from "../components/Pages/Admin/Timetable/CreateTimeTableForm";
import ExamDashboard from "../components/Pages/Admin/Exam/ExamDashboard";
import ExamType from "../components/Pages/Admin/Exam/ExamType";
import AddSubject from "../components/Pages/Admin/Subject/AddSubject";
import Subjects from "../components/Pages/Admin/Subject/Subjects";

const routes = {
  "/": () => <AdminDashboard />,
  "/user/new": () => <AddUser />,
  "/gatepass/view/:id": ({ id }) => <ViewGatePass id={id} />,
  "/logout": () => <Logout />,
  "/subjects": () => <Subjects />,
  "/subject/new": () => <AddSubject />,
  "/timetable": () => <TimetableDashboard />,
  "/timetable/new": () => <CreateTimeTableForm />,
  "/exam": () => <ExamDashboard />,
  "/exam/createtypes": () => <ExamType />,
};

const AdminRouter = () => {
  const page = useRoutes(routes);
  return page ? <AdminNavbar page={page} /> : <NotFoundPage />;
};

export default AdminRouter;
