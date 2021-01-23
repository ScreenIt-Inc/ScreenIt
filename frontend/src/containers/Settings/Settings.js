import React, { useState } from "react";
import ButtonGroup from "../../components/Controls/Button/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Settings as SettingsIcon, Lock, ListAlt } from "@material-ui/icons";
import { useSelector } from "react-redux";
import General from "../../components/Settings/General";

export default function Settings(props) {
  const [buttons] = useState([
    { category: "General", icon: SettingsIcon },
    { category: "Permissions", icon: Lock },
    { category: "Form", icon: ListAlt },
  ]);
  const category = useSelector((state) => state.setting.category);

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <ButtonGroup buttons={buttons} page="Settings" />
      </Grid>
      {category === "General" && <General />}
    </Grid>
  );
}
