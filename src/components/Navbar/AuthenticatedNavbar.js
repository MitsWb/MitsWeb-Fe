import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import PaymentIcon from "@material-ui/icons/Payment";
import EventIcon from "@material-ui/icons/Event";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";

const AuthenticatedNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Dashboard",
      icon: <DashboardIcon />,
    },

    {
      path: "/user/profile",
      text: "Profile",
      icon: <AccountCircleIcon />,
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
      path: "/payment",
      text: "Payment",
      icon: <PaymentIcon />,
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
