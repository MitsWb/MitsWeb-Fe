import React from "react";
import { A } from "hookrouter";
import useHeading from "../../Pages/useHeading";
import { GroupAdd } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import AdminDashBoard from "./AdminDashboard";

export default function RequestGatePass() {
  useHeading("Users");

  return (
    <>
      <div className="w-full text-center pb-2">
        <A href="/user/new">
          <Button
            className="mb-2"
            variant="contained"
            color="primary"
            startIcon={<GroupAdd />}
          >
            New User
          </Button>
        </A>
      </div>
      <AdminDashBoard />
    </>
  );
}
