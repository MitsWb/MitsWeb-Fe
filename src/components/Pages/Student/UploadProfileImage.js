import React from "react";
import FilesUpload from "../../../utils/FilesUpload";

const UploadProfileImage = ({ imageChanged }) => {
  return (
    <div style={{ width: 200, margin: "0px auto" }}>
      <FilesUpload imageChanged={imageChanged} style={{ width: 200 }} />
    </div>
  );
};

export default UploadProfileImage;
