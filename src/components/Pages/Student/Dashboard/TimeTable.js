import React from "react";
import Table from "./Table";
const TimeTable = ({ rows }) => {
  return (
    <>
      <div className="w-full text-center">
        <h1>Timetable</h1>
      </div>
      <Table rows={rows} loading={false} />
    </>
  );
};

export default TimeTable;
