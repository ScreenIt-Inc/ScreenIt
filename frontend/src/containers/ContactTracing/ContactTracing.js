import React, { useState } from 'react';
import { connect } from 'react-redux';
// import PaperButton from '../../components/Controls/Button/PaperButton'
import ButtonGroup from '../../components/Controls/Button/ButtonGroup'
import CustomersTable from '../../components/Table/CustomersTable'
import PossibleContactsTable from '../../components/Table/PossibleContactsTable'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

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
    // fixedHeight: {
    //     height: 500,
    // }
}));

export default function ContactTracing(props) {
  const classes = useStyles();
  const [buttons] = useState([
      {quantity: 128, category: "Contact Trace", icon: PeopleAltIcon}
  ]);

  return(
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
              <CustomersTable />
          </Paper>
        </Grid>

        <Grid item xs={10}>
          <Button
            variant="contained"
            classes={classes.button}
            color="secondary"
            style={{ borderRadius: 5 }}
          >
            <span style={{color: "white"}} >Contact Trace</span>
          </Button>
        </Grid>

        <Grid item xs={10}>
            <Paper className={classes.paper}>
                <PossibleContactsTable />
            </Paper>
        </Grid>
      </Grid>
  )
}
/*
<Grid item xs={12}>
    <ButtonGroup buttons={buttons} page="Queue"/>
</Grid>
    */

// const mapStateToProps = (state) => {
//     return {
//         lang : state.lang
//     }
// }

// export default connect(mapStateToProps,null)(Home);
