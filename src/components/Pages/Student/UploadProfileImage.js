import React from "react";
import FilesUpload from "../../../utils/FilesUpload";

const UploadProfileImage = ({ imageChanged }) => {
  return (
    <div style={{ width: 350, margin: "0px auto" }}>
      <FilesUpload imageChanged={imageChanged} style={{ width: 350 }} />
    </div>
  );
};

export default UploadProfileImage;
