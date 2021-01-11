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
                <ButtonGroup buttons={buttons} handleClick={() => {console.log("clicked")}}/>
            </Grid>
            <Grid item xs={10}>
                <Paper className={classes.paper}>
                 
                </Paper>
            </Grid>
        </Grid>
    )   
}

// const mapStateToProps = (state) => {
//     return {
//         lang : state.lang
//     }
// }

// export default connect(mapStateToProps,null)(Home);