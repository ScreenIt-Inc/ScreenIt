import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { PostAdd } from "@material-ui/icons";
import React, { useState } from "react";
import { axiosInstance } from "../../network/apis";
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddQuestionDialog({ loadData }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = useState("");
  const token = Auth.isAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const requestOptions = {
      question,
    };
    await axiosInstance
      .post("/settings/addQuestion", requestOptions, config)
      .then((response) => {
        // dispatch(
        //   setCurrentSetting({
        //     permissions: [...currentUsers, { name, email, role }],
        //   })
        // );
        dispatchSnackbarSuccess("Question Added");
      })
      .catch((error) => {
        console.log(error);
        if (error.response != undefined)
          dispatchSnackbarError(error.response.data);
        else console.log(error);
      });
    loadData();
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Add a Question">
        <IconButton aria-label="postadd" onClick={handleClickOpen}>
          <PostAdd />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The header of the question is "Do you have any of the following new
            or worsening symptoms or signs?", followed by Yes or No answers.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="symptom"
            label="Sign or Symptom"
            type="symptom"
            fullWidth
            onChange={(e) => setQuestion(e.target.value)}
          />
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
