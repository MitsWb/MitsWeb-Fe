import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CSVReader from "react-csv-reader";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "700px",
    margin: "0px auto",
    padding: "20px 30px 20px 30px",
  },

  submit: {},
  wrapper: {
    position: "relative",
  },
  card: {
    margin: "0px auto",
  },
  selectMenu: {
    marginTop: 10,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  facultyRadio: {
    "&$checked": {
      color: "#7FFF00",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  studentRadio: {
    "&$checked": {
      color: "#FFFF33",
    },
  },
  textField: {
    marginLeft: "10px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  checked: {},
}));

const UploadUser = ({ open, handleClose, handleConfirm }) => {
  const [type, settype] = useState("student");
  const classes = useStyles();
  const minimalSelectClasses = useMinimalSelectStyles();
  const [filevalid, setfilevalid] = useState({ validity: false, data: [] });
  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const handleUpload = (data, fileInfo) => {
    let validFile = true;
    let resArr = [];
    const departments = ["CE", "ME", "EEE", "ECE", "CSE"];
    if (type === "student") {
      if (data[0].length !== 6) {
        validFile = false;
      } else {
        for (let i = 0; i < data.length; i++) {
          const student = {
            email: data[i][0],
            password: data[i][1],
            department: data[i][2],
            currentYear: data[i][3],
            passoutYear: data[i][4],
            rollNo: data[i][5],
          };
          const currentYears = [1, 2, 3, 4];
          if (
            student.email &&
            student.password &&
            student.department &&
            departments.find((e) => e === student.department.toUpperCase()) &&
            student.currentYear &&
            currentYears.find((e) => e === Number(student.currentYear)) &&
            student.passoutYear &&
            student.rollNo
          ) {
            resArr = resArr.concat(student);
          }
        }
      }
    } else if (type === "faculty") {
      if (data[0].length !== 5) {
        validFile = false;
      } else {
        for (let i = 0; i < data.length; i++) {
          const faculty = {
            email: data[i][0],
            password: data[i][1],
            department: data[i][2],
            joiningYear: Number(data[i][3]),
            internalId: data[i][4],
          };
          if (
            faculty.email &&
            faculty.password &&
            faculty.department &&
            departments.find((e) => e === faculty.department.toUpperCase()) &&
            faculty.joiningYear &&
            faculty.internalId
          ) {
            resArr = resArr.concat(faculty);
          }
        }
      }
    }
    setfilevalid({ data: resArr, validity: validFile });
  };
  const handleSubmit = () => {
    if (filevalid.validity) {
      handleConfirm(type, filevalid.data);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Upload</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <Select
            disableUnderline
            classes={{ root: minimalSelectClasses.select }}
            MenuProps={menuProps}
            IconComponent={iconComponent}
            value={type}
            onChange={(e) => settype(e.target.value)}
            displayEmpty
            id="type"
            name="type"
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"student"}>Student</MenuItem>
            <MenuItem value={"faculty"}>Faculty</MenuItem>
          </Select>
          <FormHelperText>User Type</FormHelperText>
        </FormControl>
        <div className="my-3">
          {type === "student" ? (
            <Typography size="h3">
              Format: [email,password,department,currentYear,passoutYear,rollNo]
            </Typography>
          ) : type === "admin" ? (
            <Typography size="h3">Format: [email,password]</Typography>
          ) : type === "faculty" ? (
            <Typography size="h3">
              Format: [email,password,department,joining year,interalId]
            </Typography>
          ) : type === "security" ? (
            <Typography size="h3">Format: [email,password]</Typography>
          ) : (
            ""
          )}
        </div>
        <CSVReader onFileLoaded={handleUpload} />
      </DialogContent>
      <DialogActions>
        <Button
          color="default"
          size="small"
          onClick={handleClose}
          variant="outlined"
          style={{ outline: "none" }}
        >
          Back
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={handleSubmit}
          variant="outlined"
          style={{ outline: "none" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const LoaderButton = ({ Loading, handleSubmit, type }) => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  React.useEffect(() => {
    let mount = true;
    if (mount) {
      if (!Loading) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    return () => {
      mount = false;
    };
  }, [Loading]);

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        {type} User
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const AddUserForm = ({
  handleChange,
  handleSubmit,
  Form,
  Error,
  loading,
  handleConfirm,
}) => {
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const minimalSelectClasses = useMinimalSelectStyles();
  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };
  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const dateObj = new Date();
  const presentYear = dateObj.getFullYear();

  return (
    <>
      <UploadUser
        handleConfirm={(type, data) => {
          setopen(false);
          handleConfirm(type, data);
        }}
        open={open}
        handleClose={() => setopen(false)}
      />
      <Card className={classes.form}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Add User
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              className="ml-6"
              onClick={() => setopen(true)}
              color="default"
              variant="contained"
              style={{ outline: "none" }}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-margin-dense"
              name="email"
              value={Form.email}
              label="Email"
              onChange={handleChange}
              autoComplete="email"
              error={Error["email"] ? true : false}
              helperText={Error["email"]}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Password"
              id="outlined-margin-dense"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="password"
              value={Form.password}
              onChange={handleChange}
              error={Error["password"] ? true : false}
            />
          </Grid>
          {Form.type === "faculty" && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="outlined-margin-dense"
                  name="joiningYear"
                  value={Form.joiningYear}
                  label="Year Of Joining"
                  onChange={handleChange}
                  autoComplete="joiningYear"
                  error={Error["joiningYear"] ? true : false}
                  helperText={Error["joiningYear"]}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Internal ID"
                  id="outlined-margin-dense"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  name="rollNo"
                  value={Form.rollNo}
                  onChange={handleChange}
                  error={Error["rollNo"] ? true : false}
                  helperText={Error["rollNo"]}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <Select
                disableUnderline
                classes={{ root: minimalSelectClasses.select }}
                MenuProps={menuProps}
                IconComponent={iconComponent}
                value={Form.type}
                onChange={handleChange}
                displayEmpty
                id="type"
                name="type"
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"faculty"}>Faculty</MenuItem>
                <MenuItem value={"security"}>Security</MenuItem>
                <MenuItem value={"office"}>Office</MenuItem>
              </Select>
              <FormHelperText>User Type</FormHelperText>
            </FormControl>
          </Grid>
          {(Form.type === "student" || Form.type === "faculty") && (
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Select
                  disableUnderline
                  classes={{ root: minimalSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  onChange={handleChange}
                  displayEmpty
                  id="department"
                  name="department"
                  value={Form.department}
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="None">
                    <em>Select Department</em>
                  </MenuItem>
                  <MenuItem value={"CE"}>CE</MenuItem>
                  <MenuItem value={"ME"}>ME</MenuItem>
                  <MenuItem value={"EEE"}>EEE</MenuItem>
                  <MenuItem value={"ECE"}>ECE</MenuItem>
                  <MenuItem value={"CSE"}>CSE</MenuItem>
                </Select>
                <FormHelperText style={{ fontSize: 13 }}>
                  Department
                </FormHelperText>
              </FormControl>
            </Grid>
          )}

          {Form.type === "student" && (
            <>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <Select
                    disableUnderline
                    classes={{ root: minimalSelectClasses.select }}
                    MenuProps={menuProps}
                    IconComponent={iconComponent}
                    onChange={handleChange}
                    displayEmpty
                    id="currentYear"
                    name="currentYear"
                    value={Form.currentYear}
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="None">
                      <em>Select Current Year</em>
                    </MenuItem>
                    <MenuItem value={1}>First</MenuItem>
                    <MenuItem value={2}>Second</MenuItem>
                    <MenuItem value={3}>Third</MenuItem>
                    <MenuItem value={4}>Fourth</MenuItem>
                  </Select>
                  <FormHelperText style={{ fontSize: 13 }}>
                    Current Year
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <Select
                    disableUnderline
                    classes={{ root: minimalSelectClasses.select }}
                    MenuProps={menuProps}
                    IconComponent={iconComponent}
                    value={Form.passoutYear}
                    onChange={handleChange}
                    displayEmpty
                    id="passoutYear"
                    name="passoutYear"
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="None">
                      <em>Select Passout Year</em>
                    </MenuItem>
                    <MenuItem value={presentYear}>{presentYear}</MenuItem>
                    <MenuItem value={presentYear + 1}>
                      {presentYear + 1}
                    </MenuItem>
                    <MenuItem value={presentYear + 2}>
                      {presentYear + 2}
                    </MenuItem>
                    <MenuItem value={presentYear + 3}>
                      {presentYear + 3}
                    </MenuItem>
                    <MenuItem value={presentYear + 4}>
                      {presentYear + 4}
                    </MenuItem>
                  </Select>
                  <FormHelperText>Passout Year</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="outlined-margin-dense"
                  name="rollNo"
                  value={Form.rollNo}
                  label="Roll No"
                  onChange={handleChange}
                  autoComplete="rollNo"
                  error={Error["rollNo"] ? true : false}
                  helperText={Error["rollNo"]}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <div className="text-center">
            <LoaderButton
              type={"Submit"}
              handleSubmit={handleSubmit}
              Loading={loading}
            />
          </div>
        </Grid>
      </Card>
    </>
  );
};

export default AddUserForm;
