//////////////////////////////
// Imports
//////////////////////////////
import "../styles/App.css";
import React, { useEffect, useState } from "react";
import { wsConnect, wsDisconnect, wsSetup } from "../store/actions";
import { connect } from "react-redux";
import { URL } from "../config";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import Layout from "./Layout";
import BaseGrid from "./BaseGrid";

export const ParamsContext = React.createContext({
  machine: null,
  program: null,
});

//////////////////////////////
// Component
//////////////////////////////
function App(props) {
  let currentRoute = useRouteMatch("/:machine/:program?");
  const [currentMachine, setCurrentMachine] = useState(null);
  const [currentProgram, setCurrentProgram] = useState(null);

  useEffect(() => {
    setCurrentMachine(currentRoute ? currentRoute.params.machine : null);
    setCurrentProgram(currentRoute ? currentRoute.params.program : null);
  }, [currentRoute]);

  const disconnectFunc = () => {
    props.wsDisconnect(URL);
  };

  useEffect(() => {
    window.removeEventListener("unload", disconnectFunc);
    window.addEventListener("unload", disconnectFunc);
    props.wsDisconnect(URL);
    props.wsSetup(URL);
    props.wsConnect(URL);
    return () => {
      props.wsDisconnect(URL);
    };
  }, []);

  return (
    <div className="App">
      <ParamsContext.Provider
        value={{
          machine: currentMachine,
          program: currentProgram,
        }}
      >
        <Layout>
          <BaseGrid >
            test
          </BaseGrid>
        </Layout>
      </ParamsContext.Provider>
    </div>
  );
}
//////////////////////////////
// Connections
//////////////////////////////
App.propTypes = {
  wsConnect: PropTypes.func.isRequired,
  wsDisconnect: PropTypes.func.isRequired,
  wsSetup: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  wsSetup,
};

export default connect(null, mapDispatchToProps)(App);
