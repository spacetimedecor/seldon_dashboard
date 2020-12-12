import "../styles/App.css";
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import {wsConnect} from "../store/actions";
import {connect} from "react-redux";
import {URL} from '../config';
import PropTypes from 'prop-types';

function App(props) {

  useEffect(() => {
    props.wsConnect(URL);
  }, [])

  return (
    <div className="App">
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

App.propTypes = {
  wsConnect: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  wsConnect
};

export default connect(null, mapDispatchToProps)(App);
