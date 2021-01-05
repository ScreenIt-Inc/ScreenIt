import React from 'react';
import PaperButton from './PaperButton'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentTable } from '../../../store/Table/TableAction'

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
    const classes = useStyles()
    const category = useSelector(state => state.table.category)
    const dispatch = useDispatch()

    return(
        <div className={classes.root}>
            {buttons.map((button,i) => {
                return (
                    <div key={"Button"+i+button.category} className={classes.paper}>
                        <PaperButton selected={button.category === category} quantity={button.quantity} category={button.category} icon={button.icon} handleClick={() => dispatch(setCurrentTable(button.category))} />
                    </div>
                )
            })}
        </div>
    )
};
  
  export default ButtonGroup