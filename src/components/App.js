import "../styles/App.css";
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Slider from '@material-ui/core/Slider';
import {setPollSpeed, wsConnect, wsDisconnect, addMachine, wsSetup} from "../store/actions";
import { connect } from "react-redux";
import { URL } from "../config";
import PropTypes from "prop-types";
import Layout from "./Layout";

function App(props) {

  useEffect(() => {
    props.wsDisconnect(URL);
    props.wsSetup(URL);
    return () => {
      props.wsDisconnect(URL);
    };
  }, []);

  function valuetext(value) {
    return `${value}ms`;
  }

  return (
    <div className="App">
      <Layout>
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
          getAriaValueText={valuetext}
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
      </Layout>
    </div>
  );
}

App.propTypes = {
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

export default connect(null, mapDispatchToProps)(App);
