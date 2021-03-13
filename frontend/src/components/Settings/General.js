import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/apis";
import { setCurrentSetting } from "../../store/Setting/SettingAction";
import Auth from "../../utils/Auth";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 900,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    textAlign: "right",
  },
}));

export default function General(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const generalRedux = useSelector((state) => state.setting.general);
  const category = useSelector((state) => state.setting.category);
  const [values, setValues] = useState(generalRedux ? generalRedux : {});
  const token = Auth.isAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axiosInstance
      .get("/settings/getSettings", config)
      .then((response) => {
        console.log(response);
        const {
          establishmentId,
          establishmentName,
          maxCapacity,
          notificationMessage,
        } = response.data.generalSettings;
        setValues({
          establishmentId,
          establishmentName,
          maxCapacity,
          notificationMessage,
        });
        dispatch(
          setCurrentSetting({
            general: {
              establishmentId,
              establishmentName,
              maxCapacity,
              notificationMessage,
            },
          })
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.response != undefined)
          dispatchSnackbarError(error.response.data);
        else dispatchSnackbarError(error);
      });
  };

  const handleSave = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { establishmentName, maxCapacity, notificationMessage } = values;
    const requestOptions = {
      establishmentName,
      maxCapacity,
      notificationMessage,
    };
    await axiosInstance
      .post("/settings/saveGeneral", requestOptions, config)
      .then((response) => {
        dispatch(setCurrentSetting({ general: values }));
        dispatchSnackbarSuccess("Settings Saved");
      })
      .catch((error) => {
        // console.log(error.response.data.errors.message);
        dispatchSnackbarError(error.response.data);
      });
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={8}>
          <h4 className={classes.title}>{category} Settings</h4>
        </Grid>
        <Grid item xs={4} className={classes.buttonContainer}>
          <Tooltip title="Save Settings">
            <IconButton
              aria-label="save"
              style={{ marginTop: -15 }}
              onClick={handleSave}
            >
              <Save />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-message"
            label="Establishment Name"
            type="text"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={values.establishmentName}
            onChange={(e) =>
              setValues({ ...values, establishmentName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-capacity"
            label="Establishment ID"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            disabled
            value={values.establishmentId}
            onChange={(e) =>
              setValues({ ...values, establishmentId: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-capacity"
            label="Max Capacity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={values.maxCapacity}
            onChange={(e) =>
              setValues({ ...values, maxCapacity: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-message"
            label="Notification Message"
            type="text"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            multiline
            rows={3}
            value={values.notificationMessage}
            onChange={(e) =>
              setValues({ ...values, notificationMessage: e.target.value })
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
