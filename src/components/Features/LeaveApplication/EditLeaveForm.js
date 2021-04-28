import React, { useState, useEffect } from "react";
import { cancelLeave } from "../../../redux/apiActions";
import ConfirmationBox from "../GatePass/ConfirmPage";
import LeaveForm from "./LeaveForm";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { editLeave } from "../../../redux/apiActions";

const FormDialog = ({ open, handleClose, data, changeStatus }) => {
  const [Data, setData] = useState();

  const [leaveForm, setLeaveForm] = useState({});
  const initError = {
    description: "",
    toDate: "",
    type: "",
    fromTime: "",
    toTime: "",
    date: "",
  };
  const [Error, setError] = useState(initError);
  const loading = false;
  const dispatch = useDispatch();
  const [confOpen, setconfOpen] = useState(false);

  useEffect(() => {
    setData(data._id);
    setLeaveForm({
      description: data.description,
      toDate: data.toDate,
      type: data.type,
      fromTime: data.fromTime,
      toTime: data.toTime,
      date: data.date,
      _id: data._id,
    });
    // eslint-disable-next-line
  }, [data]);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };
  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    if (isNullOrWhiteSpace(leaveForm.description)) {
      formValid = false;
      err["description"] = "This field is required";
    }
    if (leaveForm.date === "") {
      formValid = false;
      err["date"] = "This field is required";
    }
    if (leaveForm.type === "halfDay") {
      if (leaveForm.fromTime === "") {
        formValid = false;
        err["fromTime"] = "This field is required";
      }
      if (leaveForm.toTime === "") {
        formValid = false;
        err["toTime"] = "This field is required";
      }
    } else {
      if (leaveForm.toDate === "") {
        formValid = false;
        err["toDate"] = "This field is required";
      }
    }
    setError(err);
    return formValid;
  }
  const handleSubmit = () => {
    if (validInputs()) {
      handleClose();
      changeStatus(true);
      dispatch(editLeave(leaveForm)).then((res) => {
        if (res && res.data && res.data.success) {
          changeStatus(false, "Leave updated");
        } else {
          changeStatus(false, res.data ? res.data.msg : "Error", "error");
        }
      });
    }
  };

  const handleUserDelete = () => {
    setconfOpen(false);
    handleClose();
    dispatch(cancelLeave({ deleteId: Data })).then((res) => {
      if (res && res.data && res.data.success) {
        changeStatus(false, "Deleted");
        // handleClose("DELETED", 1);
      } else {
        changeStatus(false, "An error occured", "error");
      }
    });
  };

  return (
    <>
      <ConfirmationBox
        open={confOpen}
        handleClose={() => {
          setconfOpen(false);
        }}
        handleConfirm={handleUserDelete}
      />
      <Dialog
        open={open}
        onClose={() => {
          setError(initError);
          handleClose();
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <LeaveForm
            Form={leaveForm}
            handleChange={handleChange}
            Error={Error}
            Helper={""}
            title="Edit"
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{ outline: "none" }}
            color="secondary"
            onClick={() => {
              setconfOpen(true);
            }}
          >
            <DeleteForeverIcon color="secondary" />
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function EditLeaveForm({ open, handleClose, data, changeStatus }) {
  return (
    <>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={data}
        changeStatus={changeStatus}
      />
    </>
  );
}

export default EditLeaveForm;
