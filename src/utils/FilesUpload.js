import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import Notify from "./Notify";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function FilesUpload({ imageChanged }) {
  const classes = useStyles();
  const [imgCollection, setImgCollection] = useState([]);
  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });

  const onFileChange = (files) => {
    let items = files.map((fileItem) => fileItem.file);
    setImgCollection([...imgCollection, items]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();

    for (let img in imgCollection[0]) {
      formData.append("imgCollection", imgCollection[0][img]);
    }

    formData.append("folder", "folder-name");
    const options = {
      headers: {
        "content-type": "application/json",
        "mitsweb-access-token":
          localStorage.getItem("mitsweb-access-token") || "",
      },
    };

    try {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/files/`, formData, options)
        .then((res) => {
          setImgCollection([]);
          if (res && res.data) {
            imageChanged(res);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <form onSubmit={onSubmit}>
        <div className="filepond-wrapper">
          <FilePond
            files={imgCollection || []}
            allowMultiple={false}
            server={null}
            onupdatefiles={(fileItems) => onFileChange(fileItems)}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          ></FilePond>
        </div>
        <div className="form-group">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={onSubmit}
          >
            Upload
          </Button>
        </div>
      </form>
    </>
  );
}

export default FilesUpload;
