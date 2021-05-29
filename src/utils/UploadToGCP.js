import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Notify from "./Notify";
import "./hideCredits.css";
import { Grid } from "@material-ui/core";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UploadToGCP({ multiple }) {
  console.log("i am");
  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });
  const [fileCollection, setFileCollection] = useState([]);

  const onFileChange = (files) => {
    let items = files.map((fileItem) => fileItem.file);
    setFileCollection([...fileCollection, items]);
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <div style={{ width: 200 }}></div>
        </Grid>
      </Grid>
    </>
  );
}

export default UploadToGCP;
