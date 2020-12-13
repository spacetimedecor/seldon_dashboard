import "../styles/App.css";
import React, { useEffect } from "react";
import {
  wsConnect,
  wsDisconnect,
  wsSetup
} from "../store/actions";
import {connect} from "react-redux";
import { URL } from "../config";
import PropTypes from "prop-types";
import {BrowserRouter as Router} from "react-router-dom";

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
