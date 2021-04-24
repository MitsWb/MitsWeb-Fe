import React from "react";
import { A } from "hookrouter";
import useHeading from "../../../Pages/useHeading";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button } from "@material-ui/core";
import ViewSubjects from "./ViewSubjects";

export default function Subjects() {
  useHeading("Subjects");

  return (
    <>
      <div className="w-full text-center pb-2">
        <A href="/subject/new">
          <Button
            className="mb-2"
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
          >
            New Subject
          </Button>
        </A>
      </div>
      <ViewSubjects />
    </>
  );
}
