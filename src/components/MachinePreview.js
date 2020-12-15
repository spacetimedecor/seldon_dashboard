import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import {addMachine, setPollSpeed, switchConnection, wsConnect, wsDisconnect} from "../store/actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

export const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

const MachinePreview = (props) => {

  const classes = gridStyles();

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            Test
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

//////////////////////////////
// Connections
//////////////////////////////
MachinePreview.propTypes = {
  machines: PropTypes.array,
};

const mapDispatchToProps = {
  wsConnect,
  wsDisconnect,
  addMachine,
  setPollSpeed,
  switchConnection,
};

const mapStateToProps = (state) => ({
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
            cpu: programValue.CPU,
            memory: programValue.Memory,
            name: programValue.Name,
            startTime: programValue.StartTime,
            id: programValue.ID,
          };
        }),
      };
    })
    : [],
});

export default connect(mapStateToProps, mapDispatchToProps)(MachinePreview);