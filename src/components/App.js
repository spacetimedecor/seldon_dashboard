import "../styles/App.css";
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Slider from '@material-ui/core/Slider';

import {
  setPollSpeed,
  wsConnect,
  wsDisconnect,
  addMachine,
  wsSetup
} from "../store/actions";
import {connect, Provider} from "react-redux";
import { URL } from "../config";
import PropTypes from "prop-types";
import Layout from "./Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Machine from "../pages/Machine";
import Settings from "../pages/Settings";

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

import Routing from '../routing.js';



function App(props) {

  useEffect(() => {
    props.wsDisconnect(URL);
    props.wsSetup(URL);
    // props.wsConnect(URL);
    return () => {
      props.wsDisconnect(URL);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Routing />
      </Router>
    </div>
  );
}

App.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  wsSetup: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  wsSetup
};

export default connect(null, mapDispatchToProps)(App);
