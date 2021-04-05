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
  const initForm = {
    description: data.description,
    toTimestamp: data.toTimestamp,
    fromTimestamp: data.fromTimestamp,
  };
  const [leaveForm, setLeaveForm] = useState(initForm);
  const initError = {
    description: "",
  };
  const [Error, setError] = useState(initError);
  const [date, setDate] = useState({
    fromTimestamp: data.fromTimestamp,
    toTimestamp: data.toTimestamp,
  });
  const loading = false;
  const dispatch = useDispatch();
  const [confOpen, setconfOpen] = useState(false);

  useEffect(() => {
    setDate({
      toTimestamp: new Date(data.toTimestamp),
      fromTimestamp: new Date(data.fromTimestamp),
    });
    setData(data._id);
    setLeaveForm({
      description: data.description,
      _id: data._id,
      toTimestamp: new Date(data.toTimestamp),
      fromTimestamp: new Date(data.fromTimestamp),
    });
    // eslint-disable-next-line
  }, [data]);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };
  const handleDatechange = (dateNow, type) => {
    setError(initError);
    setDate({ ...date, [type]: dateNow });
    if (type === "fromTimestamp") {
      setLeaveForm({
        ...leaveForm,
        fromTimestamp: new Date(dateNow),
      });
    }
    if (type === "toTimestamp") {
      setLeaveForm({
        ...leaveForm,
        toTimestamp: new Date(dateNow),
      });
    }
  };
  const handleSubmit = () => {
    let formValid = true;
    const { description } = leaveForm;
    if (!description.replace(/\s/g, "").length) {
      formValid = false;
    }
    if (formValid) {
      handleClose();
      changeStatus(true);
      console.log(leaveForm);
      dispatch(editLeave(leaveForm)).then((res) => {
        if (res && res.data && res.data.success) {
          changeStatus(false, "Leave updated");
        } else {
          changeStatus(false, res.data ? res.data.msg : "Error", "error");
        }
      });
    } else alert("err");
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
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <LeaveForm
            Form={leaveForm}
            handleChange={handleChange}
            Error={Error}
            Helper={""}
            title="Edit Gate Pass"
            handleDateChange={handleDatechange}
            handleSubmit={handleSubmit}
            date={date}
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
