import React from "react";
import {
  Grid,
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
} from "@material-ui/icons";
import { Link } from "react-router-dom";
const RegisterField = ({
  values,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  setSelected,
}) => {
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
        label="Email"
        margin="normal"
        value={values.email}
        onChange={handleChange("email")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/login" onClick={() => setSelected("Log In")}>
          Cancel
        </Link>
      </div>
    </div>
  );
};
export default RegisterField;
