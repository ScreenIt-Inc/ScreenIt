import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbarAction } from "../../store/Snackbar/SnackbarAction";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MaterialSnackbar(props) {
  const { isOpen, message, type } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && type === "success") {
      // intervalId = setInterval(() => {
      //   dispatch(hideSnackbarAction());
      // }, 4000);
      // clearInterval(intervalId);
      const timer = setTimeout(() => {
        dispatch(hideSnackbarAction());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      console.log(reason);
      return;
    }
    console.log("close");
    dispatch(hideSnackbarAction());
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key={`bottom,center`}
      onClose={() => handleClose}
    >
      <Alert onClose={handleClose} severity={type} className="medium_font">
        {message}
      </Alert>
    </Snackbar>
  );
}
