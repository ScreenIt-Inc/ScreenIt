import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { Save } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSetting } from "../../store/Setting/SettingAction";

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
  const category = useSelector((state) => state.setting.category);
  const stateValues = useSelector((state) => state.setting.general);
  const [values, setValues] = useState({ ...stateValues });

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
              onClick={() => dispatch(setCurrentSetting({ general: values }))}
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
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
