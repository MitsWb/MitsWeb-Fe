import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import PaymentIcon from "@material-ui/icons/Payment";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EventIcon from "@material-ui/icons/Event";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";
import { useSelector } from "react-redux";

const AuthenticatedNavbar = ({ page }) => {
  const state = useSelector((reduxState) => reduxState);
  const stats = state.newapi.currentUser.data.stats;
  const drawer = [
    {
      path: "/",
      text: "Dashboard",
      icon: <DashboardIcon />,
    },

    {
      path: "/events",
      text: "Events",
      icon: <EventNoteIcon />,
    },

    {
      path: "/gatepass",
      text: "Gate Pass ",
      icon: <DirectionsWalkIcon />,
    },

    {
      path: "/leave",
      text: "Leave Application",
      icon: <EventIcon />,
    },

    {
      path: "/feedback",
      text: "Feedback",
      hidden: !stats.feedback,
      icon: <EventIcon />,
    },

    {
      path: "/payment",
      text: "Payment",
      //  hidden: !stats.payment,   Need to be done after fixing payment stat
      icon: <PaymentIcon />,
    },
    {
      path: "/user/profile",
      text: "Profile",
      icon: <AccountCircleIcon />,
    },

    { divider: true },

    {
      fn: async () => {
        // localStorage.removeItem("mitsweb-access-token");
        navigate("/logout");
        //  window.location.reload();
      },
      text: "Logout",
      icon: <VpnKeyIcon />,
    },
  ];

  return <Navbar drawer={drawer} page={page} />;
};

AuthenticatedNavbar.propTypes = {
  page: PropTypes.element,
};

export default AuthenticatedNavbar;
