import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { PersonAdd } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/apis";
import { setCurrentSetting } from "../../store/Setting/SettingAction";
import Auth from "../../utils/Auth";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "100%",
    marginRight: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUserDialog({ loadData }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    role: "User",
    password: "",
    showPassword: false,
  });
  const [open, setOpen] = React.useState(false);
  const token = Auth.isAuth();
  const dispatch = useDispatch();
  let currentUsers = useSelector((state) => state.setting.permissions);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAdd = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { name, email, password, role } = values;
    const requestOptions = {
      name,
      email,
      password,
      role,
    };
    await axiosInstance
      .post("/settings/addUser", requestOptions, config)
      .then((response) => {
        console.log("sdfsdf", currentUsers, response);
        const { name, email, role } = values;
        dispatch(
          setCurrentSetting({
            permissions: [...currentUsers, { name, email, role }],
          })
        );
        dispatchSnackbarSuccess("User Added");
      })
      .catch((error) => {
        console.log(error);
        if (error.response != null) {
          dispatchSnackbarError(error.response.data);
        } else {
          dispatchSnackbarError(
            "Cannot connect to server! Please try again later."
          );
        }
      });
    loadData();
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Add an Employee">
        <IconButton aria-label="personadd" onClick={handleClickOpen}>
          <PersonAdd />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new employee to be able to access ScreenIT, please ask them
            to enter their credentials.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Full Name"
            type="name"
            onChange={handleChange("name")}
            fullWidth
          />
          <TextField
            autoFocus
            margin="normal"
            id="email"
            label="Email Address"
            type="email"
            onChange={handleChange("email")}
            fullWidth
          />
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              fullWidth
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ paddingTop: 40 }}>
              Role
            </FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="start"
            >
              <FormControlLabel
                value="top"
                control={
                  <Radio
                    checked={values.role === "User"}
                    label="User"
                    onChange={(e) =>
                      setValues({ ...values, role: e.target.value })
                    }
                    value="User"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                }
                label="User"
                labelPlacement="end"
              />
              <FormControlLabel
                value="start"
                control={
                  <Radio
                    checked={values.role === "Admin"}
                    label="User"
                    onChange={(e) =>
                      setValues({ ...values, role: e.target.value })
                    }
                    value="Admin"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                }
                label="Admin"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
