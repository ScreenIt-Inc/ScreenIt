import React , { useState } from 'react';
import { connect } from 'react-redux';
import ButtonGroup from '../../components/Controls/Button/ButtonGroup'
import Grid from "@material-ui/core/Grid";
import { fade, makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { MenuItem, TextField, Select} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.85),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 1),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      inputRoot: {
        color: 'inherit',
      },
}));

export default function Settings(props) {
    const classes = useStyles();
    const [buttons] = useState([
        { category: "General", icon: SettingsIcon},
        { category: "Privacy", icon: LockIcon},
        { category: "Notifications", icon: NotificationsIcon},
        { category: "Permissions", icon: WidgetsIcon},
    ]);
    return(
        <Grid container spacing={3} justify="center">
            <Grid item xs={6}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
            </div>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup buttons={buttons} page="Settings"/>
            </Grid>
            <Grid item xs={10}>
                <Paper className={classes.paper}>
                    <form noValidate autoComplete="off">
                      <h6>Max Capacity</h6>
                      <TextField margin="normal" variant="outlined" label="Enter numeric value" defaultValue="10"
                      helperText="Change maximum capacity of people allowed inside"
                      id = "max-capacity" />
                      <h6>Languages</h6>
                      <p></p>
                      <Select
                        labelId = "language-select"
                        defaultValue = {"enUS"}
                      >
                        <MenuItem value={"enUS"}>English</MenuItem>
                        <MenuItem value={"frFR"}>French</MenuItem>
                        <MenuItem value={"esES"}>Spanish</MenuItem>
                      </Select>
                      <p></p>
                    </form>
                    {/* Privacy */}
                    <form noValidate autoComplete="off">
                    </form>
                    {/* Notifications */}
                    <form noValidate autoComplete="off">
                      <h6>Notification Message</h6>
                      <TextField margin="normal" variant="outlined" placeholder="Enter Message ..."
                      helperText="Customize message used to notify clients to enter"
                      id = "notif-msg" />
                      <h6>Mode</h6>
                      <p></p>
                      <Select
                        labelId = "notif-select"
                        defaultValue = {"sms"}
                      >
                        <MenuItem value={"sms"}>Text message</MenuItem>
                        <MenuItem value={"call"}>Call</MenuItem>
                      </Select>
                      <p></p>
                    </form>
                    {/* Permissions */}
                    <form noValidate autoComplete="off">
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )   
}
