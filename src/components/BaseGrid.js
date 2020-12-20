//////////////////////////////
// Imports
//////////////////////////////
import React, { useContext, useEffect } from "react";
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
import { gridItemStyles, gridLayoutStyles } from "../styles/theme";
import GridItem from "./GridItem";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Container from "@material-ui/core/Container";
import AddMachineDialog from "./AddMachineDialog";
import clsx from "clsx";
import { ParamsContext } from "./App";
import { useHistory } from "react-router-dom";

//////////////////////////////
// Component
//////////////////////////////
const BaseGrid = (props) => {
  const classes = gridItemStyles();
  const gridLayoutClasses = gridLayoutStyles();
  const history = useHistory();

  const initialState = {
    mouseX: null,
    mouseY: null,
  };

  const [menuLocation, setMenuLocation] = React.useState(initialState);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [addMachineDialog, setAddMachineDialog] = React.useState(false);
  const [hidden, setHidden] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);
  const { machine, program } = useContext(ParamsContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuLocation({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
    setMenuOpen(!menuOpen);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuLocation(initialState);
    switch (e.target.textContent) {
      case "Add Machine":
        setAddMachineDialog(true);
        break;
    }
  };

  const handleCloseAddMachine = () => {
    setAddMachineDialog(false);
  };

  // const handleExpandIndex = (i) => {
  //   setHidden(
  //     props.machines.map((m, index) => {
  //       return index !== i;
  //     })
  //   );
  //   setExpanded(
  //     props.machines.map((m, index) => {
  //       return index === i;
  //     })
  //   );
  // };

  const handleCollapse = () => {
    setHidden([]);
    setExpanded([]);
    history.push('/');
  };

  const handleExpandId = (id) => {
    if (id) {
      setHidden(
        props.machines.map((m, index) => {
          return m.id !== id;
        })
      );
      setExpanded(
        props.machines.map((m, index) => {
          return m.id === id;
        })
      );
    } else {
      handleCollapse();
    }
  };

  useEffect(() => {
    if (machine) {
      handleExpandId(machine);
    } else {
      handleCollapse();
    }
  }, [machine]);

  return (
    <Container
      style={{ padding: 0, margin: 0 }}
      maxWidth={false}
      onClick={handleClick}
    >
      <Menu
        keepMounted
        open={
          menuOpen &&
          menuLocation.mouseY !== null &&
          menuLocation.mouseX !== null
        }
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          menuLocation.mouseY !== null && menuLocation.mouseX !== null
            ? { top: menuLocation.mouseY, left: menuLocation.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Add Machine</MenuItem>
      </Menu>
      <ReactGridLayout
        className={gridLayoutClasses.root}
        cols={4}
        rowHeight={1000 / 4}
        width={1200}
        // height={1000}
        autoSize={false}
        draggableHandle=".draggable"
        // isResizable={false}
        // isBounded={true}
        // preventCollision
        // onLayoutChange={this.onLayoutChange}
      >
        {props.machines.map((machine, i) => {
          return (
            <Paper
              className={clsx(classes.root, {
                ["itemHidden"]: hidden[i] === true,
                ["expanded"]: expanded[i],
              })}
              elevation={4}
              key={`machine-${machine.id}`}
              // onClick={(e) => {e.preventDefault(); e.stopPropagation();}}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <GridItem
                index={i}
                isExpanded={expanded[i]}
                type={"machine"}
                machine={machine}
                data-grid={{ x: i * 4, y: 0, w: 1, h: 1, static: false }}
              />
            </Paper>
          );
        })}
      </ReactGridLayout>
      <AddMachineDialog
        open={addMachineDialog}
        handleClose={handleCloseAddMachine}
      />
    </Container>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(BaseGrid);
