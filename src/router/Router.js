import React, { useState } from "react";
import PublicRouter from "./PublicRouter";
import AuthenticatedRouter from "./AuthenticatedRouter";
import { useAbortableEffect } from "../utils/UseAbortableEffect";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/apiActions";
import { navigate } from "hookrouter";
import Loader from "../utils/Loader";
import AdminRouter from "./AdminRouter";
import Notify from "../utils/Notify";
import FacultyRouter from "./FacultyRouter";

const Router = () => {
  const [user, setUser] = useState();
  const [loggedinAs, setloggedinAs] = useState({
    faculty: false,
    admin: false,
  });
  const dispatch = useDispatch();
  const state = useSelector((reduxState) => reduxState);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const currentUser = state.newapi.currentUser;

  useAbortableEffect(
    async (status) => {
      const access = localStorage.getItem("mitsweb-access-token");
      if (access) {
        const res = await dispatch(getCurrentUser());

        if (res) {
          if (res.data) {
            if (
              res.data.data.type === "owner" ||
              res.data.data.type === "admin"
            )
              if (res.data.data.type === "admin")
                setloggedinAs({ faculty: false, admin: true });
            if (res.data.data.type === "faculty")
              setloggedinAs({ faculty: true, admin: false });
            setUser(res.data.data);
          } else {
            setnotify({
              popup: true,
              msg: "Please login again",
              type: "error",
            });
            navigate("/");
          }
        } else {
          setnotify({
            popup: true,
            msg: "Please login again",
            type: "error",
          });
          navigate("/");
        }
      } else {
        setUser(null);
      }
    },
    [dispatch]
  );

  const closeAlert = () => {
    setnotify({ popup: false });
  };
  if (user !== null && (!currentUser || currentUser.isFetching)) {
    return <Loader />;
  }
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      {user ? (
        loggedinAs.admin ? (
          <AdminRouter />
        ) : loggedinAs.faculty ? (
          <FacultyRouter />
        ) : (
          <AuthenticatedRouter />
        )
      ) : (
        <PublicRouter />
      )}
    </>
  );
};

export default Router;
