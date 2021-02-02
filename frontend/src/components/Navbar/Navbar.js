import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Logo from "../../assets/images/ScreenitLogo.png";
import ContactTracing from "../../containers/ContactTracing/ContactTracing";
import Queue from "../../containers/Queue/Queue";
import Settings from "../../containers/Settings/Settings";
import history from "../../routes/History";
import Auth from "../../utils/Auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
    }),
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
  },
  drawerIcon: {
    color: theme.palette.secondary.light,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.primary.dark,
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    overflow: "auto",
  },
  icons: {
    color: theme.palette.secondary.light,
  },
  iconsSelected: {
    color: theme.palette.primary.light,
  },
}));

export default function Navbar({ props }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const pages = [
    { title: "Queue", route: "/queue", adminRequired: false },
    {
      title: "Contact Tracing",
      route: "/contactTracing",
      adminRequired: false,
    },
    { title: "Main Setting", route: "/settings", adminRequired: true },
  ];

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <img src={Logo} alt="ScreenIT" width="150" height="150"></img>
            <IconButton onClick={handleDrawer} className={classes.drawerIcon}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {pages.map((page, i) => (
              <ListItem
                button
                key={page.title}
                selected={selected === i}
                onClick={() => setSelected(i)}
                component={Link}
                to={page.route}
              >
                <ListItemIcon
                  className={
                    selected === i ? classes.iconsSelected : classes.icons
                  }
                >
                  {i === 0 && <DeveloperBoardIcon />}
                  {i === 1 && <PeopleAltIcon />}
                  {i === 2 && <SettingsIcon />}
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="Sign Out"
              onClick={() => Auth.signOut()}
              // component={Link}
              // to={"/login"}
            >
              <ListItemIcon className={classes.icons}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div />
          <Switch>
            <Route path="/queue">
              <Queue props={props} />
            </Route>
            <Route path="/contactTracing">
              <ContactTracing props={props} />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
