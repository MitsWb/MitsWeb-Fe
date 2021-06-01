import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dimensions from "../../Pages/Shared/Dimensions";
import AddEventDialog from "./AddEventDialog";
import { useDispatch } from "react-redux";
import { getEvents, postEvent } from "./../../../redux/apiActions";
import { Notify } from "../../../utils";
import { Container } from "@material-ui/core";

const localizer = momentLocalizer(moment);
const propTypes = {};

const EventsCalendar = ({ selectable }) => {
  const dispatch = useDispatch();
  const initForm = {
    start: "",
    end: "",
    title: "",
    department: "all",
    semester: 0,
  };
  const [event, setEvent] = useState([]);
  const [form, setForm] = useState(initForm);
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState({ msg: "", popup: false, type: "" });
  const [loading, setLoading] = useState(false);

  const { height } = Dimensions();

  const handleClose = () => {
    setOpen(false);
  };

  function handleSelect({ start, end }) {
    setForm({ ...form, start: start, end: end });
    setOpen(true);
  }

  const handleSubmit = () => {
    setLoading(true);
    dispatch(postEvent(form)).then((res) => {
      if (res && res.data && res.data.success) {
        setNotify({
          type: "success",
          msg: "Event Created Successfully!!",
          popup: true,
        });
      } else {
        setNotify({
          type: "error",
          msg: res.data.msg,
          popup: true,
        });
      }
      setLoading(false);
      setOpen(false);
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    dispatch(getEvents()).then((res) => {
      if (res.data && res.data.success && res.data.data) {
        // eslint-disable-next-line
        res.data.data.map((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
        });
        setEvent(res.data.data);
      }
    });
  }, [dispatch, event]);

  return (
    <>
      <Container fixed>
        <AddEventDialog
          open={open}
          form={form}
          handleChange={handleChange}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <div style={{ height: height - 120 }}>
          <Calendar
            selectable={selectable}
            localizer={localizer}
            events={event}
            defaultView={Views.MONTH}
            defaultDate={new Date()}
            onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={handleSelect}
          />
        </div>
      </Container>
      <Notify props={notify} closeAlert={() => setNotify({ popup: false })} />
    </>
  );
};

EventsCalendar.propTypes = propTypes;

export default EventsCalendar;
