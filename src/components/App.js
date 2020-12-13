import "../styles/App.css";
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Slider from '@material-ui/core/Slider';
import {setPollSpeed, wsConnect, wsDisconnect} from "../store/actions";
import { connect } from "react-redux";
import { URL } from "../config";
import PropTypes from "prop-types";

function App(props) {

  useEffect(() => {

    return () => {
      props.wsDisconnect(URL);
    };
  }, []);

  function valuetext(value) {
    return `${value}°C`;
  }

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

      <Slider
        defaultValue={1000}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={100}
        onChange={(e, v) => {
          props.setPollSpeed(v)
        }}
        marks
        min={100}
        max={2000}
      />
    </div>
  );
}

App.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  setPollSpeed: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  setPollSpeed,
};

export default connect(null, mapDispatchToProps)(App);
