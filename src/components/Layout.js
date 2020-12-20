//////////////////////////////
// Imports
//////////////////////////////
import React, { useContext, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DesktopMacOutlinedIcon from "@material-ui/icons/DesktopMacOutlined";
import PropTypes from "prop-types";
import { formControlStyles, layoutStyles } from "../styles/theme";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ParamsContext } from "./App";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {setSortBy} from "../store/actions";
//////////////////////////////
// Component
//////////////////////////////
const Sidebar = (props) => {
  const params = useContext(ParamsContext);
  const classes = layoutStyles();
  const formControlClasses = formControlStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Link to={"/"}>
            <Icon classes={{ root: classes.iconRoot }}>
              <img
                className={classes.imageIcon}
                src="https://www.seldon.io/wp-content/themes/seldon/includes/images/seldon-logo-mono.svg"
                alt="logo"
              />
            </Icon>
          </Link>
          <Breadcrumbs
            classes={{ root: classes.breadcrumbs }}
            aria-label="breadcrumb"
          >
            <Link to={`/`} color="inherit">
              Home
            </Link>
            {params.machine && (
              <Link to={`/${params.machine}`} color="inherit">
                {params.machine}
              </Link>
            )}
            {params.program && (
              <Link to={`/${params.machine}/${params.program}`} color="inherit">
                {params.program}
              </Link>
            )}
          </Breadcrumbs>
          <FormControl
            variant="filled"
            className={formControlClasses.formControl}
          >
            <InputLabel
              className={formControlClasses.inputLabel}
              htmlFor="sort-by"
            >
              Sort By
            </InputLabel>
            <Select
              native
              value={props.sortBy}
              onChange={(e) => props.setSortBy(e.target.value)}
            >
              <option aria-label="None" value="" />
              <option value={"name"}>Name</option>
              <option value={"startTime"}>Start Time</option>
              <option value={"id"}>ID</option>
              <option value={"cpu"}>CPU Usage</option>
              <option value={"memory"}>Memory Usage</option>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {props.machines &&
              props.machines.map((machine, i) => {
                return (
                  <ListItem
                    key={machine.ID}
                    button
                    component={Link}
                    to={`/${machine.ID}`}
                  >
                    <ListItemIcon>
                      <DesktopMacOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={machine.Name}
                      className={classes.listItemText}
                    />
                  </ListItem>
                );
              })}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
};
//////////////////////////////
// Connections
//////////////////////////////
Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  machines: PropTypes.array,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sortBy: state.SortBy,
  machines: state.MachineValues
    ? state.MachineValues.map((MachineValue) => {
        return {
          Name: MachineValue.Name,
          ID: MachineValue.ID,
        };
      })
    : [],
});

const mapDispatchToProps = {
  setSortBy,
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
