import React from "react";
import "./loading.css";
export const Loading = ({ msg }) => {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
        <div className="  py-2 px-5 rounded-lg flex items-center flex-col">
          <div className="loader-dots block relative w-20 h-5 mt-2">
            <div className="absolute top-0 mt-1 w-4 h-4 rounded-full bg-indigo-700"></div>
            <div className="absolute top-0 mt-1 w-4 h-4 rounded-full bg-red-700"></div>
            <div className="absolute top-0 mt-1 w-4 h-4 rounded-full bg-indigo-700"></div>
            <div className="absolute top-0 mt-1 w-4 h-4 rounded-full bg-red-700"></div>
          </div>
          <div className=" text-md truncate bolder font-light mt-2 text-center">
            {msg}
          </div>
        </div>
      </div>
    </div>
  );
};

const FullLoading = ({ msg = "Loading..." }) => {
  return (
    <div
      className={`h-screen maindiv  w-full items-center flex flex-col justify-center}`}
    >
      <Loading msg={msg} />
    </div>
  );
};

export default FullLoading;
