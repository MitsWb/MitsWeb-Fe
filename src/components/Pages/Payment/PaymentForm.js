import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dimensions from "./../Shared/Dimensions";
import { getPaymentTypes } from "../../../redux/apiActions";
import { Loader, Notify } from "../../../utils";

const useStyles = makeStyles({
  paper: {
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  grid: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    margin: "0px auto",
  },
  title: {
    marginTop: 20,
    fontSize: 18,
  },
  textField: {
    width: 220,
  },
});

const PaymentForm = ({
  handleChange,
  handleSubmit,
  Form,
  setForm,
  Loading,
  Error,
  title,
}) => {
  const dispatch = useDispatch();
  const { width } = Dimensions();
  const classes = useStyles();

  const [paytypes, setPaytypes] = useState({
    ready: false,
    data: [],
  });

  const [notify, setnotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setDataLoading(true);
    dispatch(getPaymentTypes()).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setPaytypes({ ready: true, data: res.data.data });
        } else {
          setnotify({
            msg: res.data.msg,
            popup: true,
            type: "error",
          });
          setDataLoading(false);
        }
      }
      setDataLoading(false);
    });

    // eslint-disable-next-line
  }, []);

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      {paytypes.ready && (
        <div>
          <Card className={classes.card}>
            <Typography className={classes.title} align="center">
              {title}
            </Typography>
            <Grid
              alignItems="center"
              justify="center"
              direction={width < 600 ? "column" : "row"}
              container
              spacing={3}
              className={classes.grid}
            >
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={paytypes.data}
                  getOptionLabel={(option) => option.type}
                  className={classes.textField}
                  onChange={(e, value) => {
                    setForm({
                      ...Form,
                      paymentType: value ? value._id : null,
                      amount: value ? value.amount : null,
                      date: value ? value.dueDate : null,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      size="small"
                      label="Payment Type"
                      variant="outlined"
                      error={Error["paymentType"] ? true : false}
                      helperText={Error["paymentType"]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  size="small"
                  variant="outlined"
                  label="Amount"
                  className={classes.textField}
                  name="amount"
                  value={Form.amount}
                  onChange={handleChange}
                  error={Error["amount"] ? true : false}
                  helperText={Error["amount"]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  size="small"
                  variant="outlined"
                  label="Due Date"
                  className={classes.textField}
                  name="date"
                  value={Form.date}
                  onChange={handleChange}
                  error={Error["date"] ? true : false}
                  helperText={Error["date"]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  label="Remarks"
                  placeholder={"17CSXXX"}
                  className={classes.textField}
                  name="remarks"
                  value={Form.remarks}
                  onChange={handleChange}
                  error={Error["remarks"] ? true : false}
                  helperText={Error["remarks"]}
                />
              </Grid>
              <Button
                style={{ margin: "0px auto", outline: "none" }}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                <Typography>Submit</Typography>
              </Button>
            </Grid>
            {Loading && <LinearProgress />}
          </Card>
        </div>
      )}
      {dataLoading && <Loader msg={"Loading exam creation form"} />}
      {!dataLoading && !paytypes.ready && (
        <h1>There is some problem loading the form!!</h1>
      )}
    </>
  );
};

export default PaymentForm;
