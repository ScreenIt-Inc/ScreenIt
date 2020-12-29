import React, { useState } from 'react';
import { connect } from 'react-redux';
// import PaperButton from '../../components/Controls/Button/PaperButton'
import ButtonGroup from '../../components/Controls/Button/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AnnouncementIcon from '@material-ui/icons/Announcement';

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
}));

export default function Queue(props) {
    const classes = useStyles();
    const [buttons, setButtons] = useState([
        {quantity: 128, category: "Capacity", icon: PeopleAltIcon},
        {quantity: 32, category: "Queue", icon: AssignmentTurnedInIcon},
        {quantity: 2, category: "Notifications", icon: NotificationsIcon},
        {quantity: 4, category: "Alert", icon: AnnouncementIcon},
    ]);

    return(
        <div>
            <ButtonGroup buttons={buttons} handleClick={() => {console.log("clicked")}}/>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         lang : state.lang
//     }
// }

// export default connect(mapStateToProps,null)(Home);