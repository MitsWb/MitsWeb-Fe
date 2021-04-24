import React from "react";
import useHeading from "../Shared/useHeading";
import Login from "./Authentication/Login";

const LoginPage = () => {
  useHeading("Login");

  return <Login />;
};

export default LoginPage;
