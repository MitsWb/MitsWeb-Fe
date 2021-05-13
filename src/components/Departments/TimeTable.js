import React from "react";

function TimeTable({ semester, department }) {
  return (
    <>
      <div className="w-full text-center">
        <div>
          This is timetale of {semester} {department}{" "}
        </div>
      </div>
    </>
  );
}

export default TimeTable;
