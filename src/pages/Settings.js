//////////////////////////////
// Imports
//////////////////////////////
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import { URL } from "../config";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import {
  addMachine,
  setPollSpeed,
  switchConnection,
  updateMachineValues,
  wsConnect,
  wsDisconnect,
  wsSetup,
} from "../store/actions";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Toggle from "@material-ui/core/Checkbox";
//////////////////////////////
// Component
//////////////////////////////
const Settings = (props) => {

  return (
    <React.Fragment>
      <Grid
        container
        padding={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <FormControlLabel
            labelPlacement="bottom"
            control={
              <Toggle
                checked={props.connection}
                onChange={(e) => {
                  if (props.connection) {
                    props.wsDisconnect(URL);
                    props.updateMachineValues([]);
                  } else {
                    props.wsConnect(URL);
                  }
                  props.switchConnection(e.target.checked);
                }}
              >
                <CheckIcon />
              </Toggle>
            }
            label="Connection"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            labelPlacement="bottom"
            control={
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  props.addMachine();
                }}
              >
                +
              </Button>
            }
            label="Add Machine"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            labelPlacement="bottom"
            control={
              <Slider
                defaultValue={500}
                value={props.localPollSpeed}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={50}
                onChange={(e, v) => {
                  props.setPollSpeed(v);
                }}
                marks
                min={50}
                max={1000}
              />
            }
            label="Poll speed"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
//////////////////////////////
// Connections
//////////////////////////////
Settings.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  addMachine: PropTypes.func.isRequired,
  setPollSpeed: PropTypes.func.isRequired,
  wsSetup: PropTypes.func.isRequired,
  switchConnection: PropTypes.func.isRequired,
  updateMachineValues: PropTypes.func.isRequired,
  connection: PropTypes.bool.isRequired,
  localPollSpeed: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  addMachine,
  setPollSpeed,
  wsSetup,
  switchConnection,
  updateMachineValues,
};

const mapStateToProps = (state) => ({
  connection: state.Connection,
  localPollSpeed: state.LocalPollSpeed,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
