import "../styles/App.css";
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { messageToServer, wsConnect, wsDisconnect } from "../store/actions";
import { connect } from "react-redux";
import { URL } from "../config";
import PropTypes from "prop-types";

function App(props) {

  useEffect(() => {
    // props.wsDisconnect(URL);
    // props.wsConnect(URL);
    return () => {
      props.wsDisconnect(URL);
    };
  }, []);

  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.wsDisconnect(URL);
        }}
      >
        Disconnect
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.wsConnect(URL);
        }}
      >
        Connect
      </Button>
    </div>
  );
}

App.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  messageToServer: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  messageToServer,
};

export default connect(null, mapDispatchToProps)(App);
