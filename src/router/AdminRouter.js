import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/Shared/NotFoundPage";
import { AdminDashboard, AddUser } from "../components/Pages/Admin/Users";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import ViewGatePass from "../components/Features/GatePass/ViewGatepass";
import Logout from "../components/Common/Logout";
import {
  TimetableDashboard,
  CreateTimeTableForm,
  TimeTable,
} from "../components/Pages/Admin/Timetable";
import { ExamDashboard, ExamType } from "../components/Pages/Admin/Exam";
import { AddSubject, Subjects } from "../components/Pages/Admin/Subject";

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
  "/timetable/:id": ({ id }) => <TimeTable _id={id} />,
};

const AdminRouter = () => {
  const page = useRoutes(routes);
  return page ? <AdminNavbar page={page} /> : <NotFoundPage />;
};

export default AdminRouter;
