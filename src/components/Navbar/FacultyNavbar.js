import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import FolderSharedIcon from "@material-ui/icons/FolderShared";

const FacultyNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Dashboard",
      icon: <DashboardIcon />,
    },
    { divider: true },
    {
      path: "/class",
      text: "My Classes",
      icon: <SupervisedUserCircleIcon />,
    },
    { divider: true },
    {
      path: "/exam",
      text: "Exams",
      icon: <MenuBookIcon />,
    },
    { divider: true },
    {
      path: "/course",
      text: "Course Resources",
      icon: <FolderSharedIcon />,
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
