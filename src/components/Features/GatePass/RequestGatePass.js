import React from "react";
import { A } from "hookrouter";
import useHeading from "../../Pages/Shared/useHeading";
import CreateIcon from "@material-ui/icons/Create";
import { Button } from "@material-ui/core";
import GetUserRequests from "./GetUserRequests";

export default function RequestGatePass() {
  useHeading(" Gate Pass");

  return (
    <>
      <div className="w-full text-center pb-2">
        <A href="/gatepass/new">
          <Button
            className="mb-2"
            variant="contained"
            color="primary"
            startIcon={<CreateIcon />}
          >
            New Gatepass
          </Button>
        </A>
      </div>
      <GetUserRequests />
    </>
  );
}
