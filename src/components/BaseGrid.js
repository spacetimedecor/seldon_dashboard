import React from "react";
import ReactGridLayout from "react-grid-layout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addMachine,
  setPollSpeed,
  switchConnection,
  updateMachineValues,
  wsConnect,
  wsDisconnect,
  wsSetup,
} from "../store/actions";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {gridItemStyles} from "../styles/theme";

class BaseGrid extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <ReactGridLayout
        className="layout"
        cols={4}
        rowHeight={1000 / 4}
        width={1200}
        height={1000}
        autoSize={true}
        draggableHandle=".draggable"
        // isResizable={false}
        // isBounded={true}
        // preventCollision
        // onLayoutChange={this.onLayoutChange}
      >
        {this.props.machines.map((machine, i) => {
          return (
            <Paper
              className={classes.root}
              elevation={3}
              key={`machine-${machine.id}`}
              data-grid={{ x: i * 4, y: 0, w: 1, h: 1, static: false }}
            >
              <span className="draggable">{machine.name}</span>
            </Paper>
          );
        })}
      </ReactGridLayout>
    );
  }
}

//////////////////////////////
// Connections
//////////////////////////////
BaseGrid.propTypes = {
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
  classes: PropTypes.object.isRequired,
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

export default withStyles(gridItemStyles)(
  connect(mapStateToProps, mapDispatchToProps)(BaseGrid)
);
