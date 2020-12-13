import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from "prop-types";
import {drawerStyles} from "../styles/theme";
import { makeStyles } from '@material-ui/styles';

const MiniDrawer = (props) => {

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
            {['Home', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index === 0 ? <HomeIcon /> : <SettingsIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {/*<List>*/}
          {/*  {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
          {/*    <ListItem button key={text}>*/}
          {/*      <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>*/}
          {/*      <ListItemText primary={text} />*/}
          {/*    </ListItem>*/}
          {/*  ))}*/}
          {/*</List>*/}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}

MiniDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}

export default MiniDrawer;
