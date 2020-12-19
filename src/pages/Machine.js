import { useParams } from "react-router";
import React from "react";
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

const Machine = (props) => {
  let { id } = useParams();

  return (
    <React.Fragment>

    </React.Fragment>
  );
};

//////////////////////////////
// Connections
//////////////////////////////
Machine.propTypes = {
  machines: PropTypes.array,
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
  switchConnection,
  updateMachineValues,
  wsSetup,
};

const mapStateToProps = (state) => ({
  connection: state.Connection,
  localPollSpeed: state.LocalPollSpeed,
  machines: state.MachineValues
    ? state.MachineValues.map((MachineValue) => {
        return {
          name: MachineValue.Name,
          id: MachineValue.ID,
          startTime: MachineValue.StartTime,
          cpu: MachineValue.CPU,
          memory: MachineValue.Memory,
          programValues: MachineValue.ProgramValues.map((programValue) => {
            return {
              cpu: `${programValue.CPU.toFixed(2)}%`,
              memory: `${programValue.Memory.toFixed(2)}%`,
              name: programValue.Name,
              startTime: programValue.StartTime,
              id: programValue.ID,
            };
          }),
        };
      })
    : [],
});

export default connect(mapStateToProps, mapDispatchToProps)(Machine);
