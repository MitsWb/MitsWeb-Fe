import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";

const FacultyNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Dashboard",
      icon: <DashboardIcon />,
    },
    { divider: true },
    {
      path: "/requests",
      text: "Approve Requests",
      icon: <DoneAllIcon />,
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

FacultyNavbar.propTypes = {
  page: PropTypes.element,
};

export default FacultyNavbar;
