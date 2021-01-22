import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  AccountCircle,
  LockRounded,
  Visibility,
  VisibilityOff,
  Business,
  Email,
  AssignmentInd,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../../utils/Shared";
import { axiosInstance } from "../../../network/apis";
import History from "../../../routes/History";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    minWidth: 300,
    marginTop: 10,
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
}));

const RegisterField = ({
  values,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  setSelected,
}) => {
  const classes = useStyles();
  const [establishmentId, setEstablishmentId] = useState("");
  const [role, setRole] = useState("Admin");
  const [name, setName] = useState("");
  const handleRegister = async () => {
    const requestOptions = {
      establishmentId: establishmentId,
      name: name,
      role: role,
      email: values.email,
      password: values.password,
    };
    await axiosInstance
      .post("/auth/signup", requestOptions)
      .then((response) => {
        dispatchSnackbarSuccess("Registered Successfully");
        window.location.reload();
      })
      .catch((error) => {
        // console.log(error.response.data.errors.message);
        dispatchSnackbarError(error.response.data);
      });
    History.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        minWidth: 300,
      }}
    >
      <TextField
        label="Establishment ID"
        margin="normal"
        value={establishmentId}
        onChange={(e) => setEstablishmentId(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Business />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="role"
        margin="normal"
        value={role}
        disabled={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AssignmentInd />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Email"
        margin="normal"
        value={values.email}
        onChange={handleChange("email")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type={values.showPassword ? "text" : "password"}
        label="Password"
        margin="normal"
        value={values.password}
        onChange={handleChange("password")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.content}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleRegister()}
        >
          Register
        </Button>
      </div>
      <div className={classes.content}>
        <Button>
          <Link
            to="/login"
            onClick={() => setSelected("Log In")}
            className={classes.button}
          >
            Go Back
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default RegisterField;
