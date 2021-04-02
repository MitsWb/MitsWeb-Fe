import React, { useEffect } from "react";
import { navigate } from "hookrouter";

const Logout = () => {
  useEffect(() => {
    if (localStorage.getItem("mitsweb-access-token")) {
      localStorage.removeItem("mitsweb-access-token");
      navigate("/");
      window.location.reload();
    } else {
      navigate("/");
    }
  }, []);
  return <></>;
};

export default Logout;
