import Grid from "@material-ui/core/Grid";
import { ListAlt, Lock, Settings as SettingsIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ButtonGroup from "../../components/Controls/Button/ButtonGroup";
import General from "../../components/Settings/General";
import Permissions from "../../components/Settings/Permissions";

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
      <Grid item xs={10}>
        {category === "General" && <General />}
        {category === "Permissions" && <Permissions />}
      </Grid>
    </Grid>
  );
}
