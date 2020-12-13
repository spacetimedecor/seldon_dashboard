import React from "react";
import Button from "@material-ui/core/Button";
import {URL} from "../config";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import {addMachine, setPollSpeed, wsConnect, wsDisconnect, wsSetup} from "../store/actions";
import {connect} from "react-redux";

const Settings = (props) => {
  return (
    <div>
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

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.addMachine();
        }}
      >
        Add machine
      </Button>

      <Slider
        defaultValue={500}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={50}
        onChange={(e, v) => {
          props.setPollSpeed(v)
        }}
        marks
        min={50}
        max={1000}
      />
    </div>
  );
}

Settings.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  addMachine: PropTypes.func.isRequired,
  setPollSpeed: PropTypes.func.isRequired,
  wsSetup: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  addMachine,
  setPollSpeed,
  wsSetup
};

export default connect(null, mapDispatchToProps)(Settings);