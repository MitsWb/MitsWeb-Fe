import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

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
      text: "Gatepass Requests",
      icon: <DoneAllIcon />,
    },
    { divider: true },
    {
      path: "/leave",
      text: "Leave Requests",
      icon: <DirectionsWalkIcon />,
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
