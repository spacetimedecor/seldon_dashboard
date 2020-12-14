import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import {URL} from "../config";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import {
  addMachine,
  setPollSpeed,
  switchConnection,
  updateMachineValues,
  wsConnect,
  wsDisconnect,
  wsSetup
} from "../store/actions";
import {connect} from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const Settings = (props) => {
  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={props.connection}
            onChange={() => {
              if (props.connection) {
                props.wsDisconnect(URL);
                props.switchConnection();
              } else {
                props.wsConnect(URL);
                props.switchConnection();
              }
            }}
          />
        }
        label="Connection"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.addMachine();
        }}
      >
        +
      </Button>
      <Slider
        defaultValue={500}
        value={props.localPollSpeed}
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
    </React.Fragment>
  );
}

Settings.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  addMachine: PropTypes.func.isRequired,
  setPollSpeed: PropTypes.func.isRequired,
  wsSetup: PropTypes.func.isRequired,
  switchConnection: PropTypes.func.isRequired,
  connection: PropTypes.bool.isRequired,
  localPollSpeed: PropTypes.number.isRequired
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  addMachine,
  setPollSpeed,
  wsSetup,
  switchConnection,
};

const mapStateToProps = (state) => ({
  connection: state.Connection,
  localPollSpeed: state.LocalPollSpeed
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);