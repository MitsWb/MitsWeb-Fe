import React from "react";
import { A } from "hookrouter";
import useHeading from "../../Pages/useHeading";
import CreateIcon from "@material-ui/icons/Create";
import { Button } from "@material-ui/core";

export default function LeaveDashboard() {
  useHeading(" Leave Application ");

  return (
    <>
      <div className="w-full text-center pb-2">
        <A href="/leave/new">
          <Button
            className="mb-2"
            variant="contained"
            color="primary"
            startIcon={<CreateIcon />}
          >
            New Leave Application
          </Button>
        </A>
      </div>
    </>
  );
}
