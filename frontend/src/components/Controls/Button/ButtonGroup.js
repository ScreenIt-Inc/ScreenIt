import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSetting } from "../../../store/Setting/SettingAction";
import { setCurrentTable } from "../../../store/Table/TableAction";
import PaperButton from "./PaperButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    marginLeft: 30,
  },
}));

const ButtonGroup = ({ buttons, page }) => {
  const classes = useStyles();
  let category = useSelector(
    page == "Queue"
      ? (state) => state.table.category
      : (state) => state.setting.category
  );
  const dispatch = useDispatch();

  const handleClick = (category) => {
    if (page == "Queue") {
      dispatch(setCurrentTable({ category: category }));
    }
    if (page == "Settings") {
      dispatch(setCurrentSetting({ category: category }));
    }
  };

  return (
    <div className={classes.root}>
      {buttons.map((button, i) => {
        return (
          <div key={"Button" + i + button.category} className={classes.paper}>
            <PaperButton
              selected={button.category === category}
              quantity={button.quantity}
              category={button.category}
              icon={button.icon}
              handleClick={() => handleClick(button.category)}
              page={page}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
