import React, { useState } from 'react';
import PaperButton from './PaperButton'
import { makeStyles } from '@material-ui/core/styles';

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
        marginLeft: 30
    }
}));

const ButtonGroup = ({buttons}) => {
    const classes = useStyles();
    const [selected, setSelected] = useState(1);

    return(
        <div className={classes.root}>
            {buttons.map((button,i) => {
                return (
                    <div key={"Button"+i+button.category} className={classes.paper}>
                        <PaperButton selected={i===selected} quantity={button.quantity} category={button.category} icon={button.icon} handleClick={() => setSelected(i)} />
                    </div>
                )
            })}
        </div>
    )
};
  
  export default ButtonGroup