import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllsubjects } from "../../../redux/apiActions";
import { Notify } from "../../../utils";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { blue } from "@material-ui/core/colors";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./../../../utils";
let color = blue;

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ColorCheckbox = withStyles({
  root: {
    color: color[400],
    "&$checked": {
      color: color[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    margin: "0px auto",
    padding: "10px 15px 10px 15px",
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: "0px auto",
    marginTop: "2rem",
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
    marginBottom: 20,
    fontSize: 18,
  },
  textField: {
    width: 220,
  },
  formControl: {
    width: "100%",
    marginTop: "5px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UploadResourcesForm = ({
  form,
  setForm,
  handleChange,
  handleSubmit,
  error,
  fileCollection,
  setFileCollection,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const [subjects, setSubjects] = useState({
    ready: false,
    data: [],
  });

  const [notify, setNotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getAllsubjects()).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setSubjects({ ready: true, data: res.data.data });
        } else {
          setNotify({
            msg: res.data.msg,
            popup: true,
            type: "error",
          });
        }
      }
    });
  }, [dispatch]);

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      {subjects.ready ? (
        <div>
          <Card className={classes.card}>
            <Typography className={classes.title} align="center">
              Add Course Resources
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={form.department}
                    onChange={handleChange}
                    label="Department"
                    name="department"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"CSE"}>
                      Computer Science Engineering
                    </MenuItem>
                    <MenuItem value={"ME"}>Mechanical Engineering</MenuItem>
                    <MenuItem value={"EEE"}>
                      Electrical And Electronics Engineering
                    </MenuItem>
                    <MenuItem value={"ECE"}>
                      Electrical And Communication Engineering
                    </MenuItem>
                    <MenuItem value={"CE"}>Civil Engineering</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Semester</InputLabel>
                  <Select
                    value={form.semester}
                    onChange={handleChange}
                    label="Semester"
                    name="semester"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {semesters.map((semester) => {
                      return <MenuItem value={semester}>{semester}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Autocomplete
                  options={subjects.data}
                  getOptionLabel={(option) => option.name}
                  className={classes.formControl}
                  onChange={(_, value) => {
                    setForm({ ...form, subject: value ? value._id : null });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subject"
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.name, inputValue);
                    const parts = parse(option.name, matches);

                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{ fontWeight: part.highlight ? 700 : 400 }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.formControl}
                  variant="outlined"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  label="Topic"
                  error={error["topic"] ? true : false}
                  helperText={error["topic"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.formControl}
                  variant="outlined"
                  placeholder="Description"
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={error["description"] ? true : false}
                  helperText={error["description"]}
                  multiline
                  rows={3}
                  rowsMax={5}
                />
              </Grid>
            </Grid>
            <RadioGroup name="type" value={form.type} onChange={handleChange}>
              <FormGroup row>
                <FormControlLabel
                  value="notes"
                  control={<ColorCheckbox />}
                  label="Class Notes"
                />
                <FormControlLabel
                  value="papers"
                  control={<ColorCheckbox />}
                  label="Exam Papers"
                />
                <FormControlLabel
                  value="ebooks"
                  control={<ColorCheckbox />}
                  label="Ebooks"
                />
                <FormControlLabel
                  value="lab"
                  control={<ColorCheckbox />}
                  label="Lab"
                />
              </FormGroup>
            </RadioGroup>
            <FilePond
              files={fileCollection}
              allowMultiple={true}
              server={null}
              onupdatefiles={setFileCollection}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            ></FilePond>
            <Grid container direction="row" justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default UploadResourcesForm;
