import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";
import PaymentIcon from "@material-ui/icons/Payment";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { BookOutlined } from "@material-ui/icons";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";

const AdminNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Users",
      icon: <DashboardIcon />,
    },

    { divider: true },

    {
      path: "/subjects",
      text: "Subjects ",
      icon: <BookOutlined />,
    },

    { divider: true },

    {
      path: "/timetable",
      text: "Timetable ",
      icon: <TableChartIcon />,
    },

    { divider: true },

    {
      path: "/exam",
      text: "Exam ",
      icon: <MenuBookIcon />,
    },

    { divider: true },

    {
      path: "/feedback",
      text: "Feedback ",
      icon: <MenuBookIcon />,
    },

    { divider: true },

    {
      path: "/payment",
      text: "Payment",
      icon: <PaymentIcon />,
    },

    { divider: true },

    {
      fn: async () => {
        navigate("/logout");
      },
      text: "Logout",
      icon: <VpnKeyIcon />,
    },
  ];

  return <Navbar drawer={drawer} page={page} />;
};

AdminNavbar.propTypes = {
  page: PropTypes.element,
};

export default AdminNavbar;
