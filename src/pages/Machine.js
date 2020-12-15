import { useParams } from "react-router";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
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
import Paper from "@material-ui/core/Paper";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "id", headerName: "ID", width: 100 },
  { field: "startTime", headerName: "Start Time", width: 250 },
  { field: "cpu", headerName: "CPU", width: 100 },
  { field: "memory", headerName: "Memory", width: 100 },
];

const Machine = (props) => {
  let { id } = useParams();

  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container>
          <Grid item xs={6}>
            <Paper elevation={1}>CPU</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1}>Memory</Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <DataGrid
              rows={
                props.machines && props.machines.length > 0
                  ? props.machines.filter((m) => m.id === id)[0].programValues
                  : []
              }
              columns={columns}
              pageSize={5}
              checkboxSelection
              autoHeight
              rowCount={10}
              autoPageSize
            />
          </Grid>
        </Grid>
      </Grid>
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
