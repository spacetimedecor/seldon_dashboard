import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import DesktopMacOutlinedIcon from '@material-ui/icons/DesktopMacOutlined';
import PropTypes from "prop-types";
import {drawerStyles} from "../styles/theme";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

const Sidebar = (props) => {

  const classes = drawerStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Icon classes={{root: classes.iconRoot}}>
            <img className={classes.imageIcon} src="https://www.seldon.io/wp-content/themes/seldon/includes/images/seldon-logo-mono.svg" alt="logo"/>
          </Icon>
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
            <ListItem button key={"Home"} component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button key={"Settings"} component={Link} to='/settings'>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {props.machines && props.machines.map((machine) => {
              return <ListItem button key={machine.ID} component={Link} to={`/machine/${machine.ID}`}>
                <ListItemIcon>
                  <DesktopMacOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={machine.Name} />
              </ListItem>
            })}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Container maxWidth="sm">
          {props.children}
        </Container>
      </main>
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  machines: PropTypes.array
}

const mapStateToProps = (state) => ({
  machines: state.MachineValues ? state.MachineValues.map(MachineValue => {
    return {
      Name: MachineValue.Name,
      ID: MachineValue.ID
    }
  }) : []
})

export default connect(mapStateToProps, null)(Sidebar);
