//////////////////////////////
// Imports
//////////////////////////////
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import {
  gridItemContentsStyles,
  gridItemStyles,
  layoutStyles,
} from "../styles/theme";
import Grid from "@material-ui/core/Grid";
import DesktopMacOutlinedIcon from "@material-ui/icons/DesktopMacOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { addMachine, removeMachine } from "../store/actions";
import clsx from "clsx";
import {useHistory} from "react-router-dom";


//////////////////////////////
// Parts
//////////////////////////////
const MachineItem = (props) => {
  const { machine } = props;
  return (
    <React.Fragment>
      <span className="draggable">{machine.name}</span>
    </React.Fragment>
  );
};

MachineItem.propTypes = {
  machine: PropTypes.object,
};

const ProgramItem = (props) => {
  const { program } = props;

  return (
    <React.Fragment>
      <span className="draggable">{program.name}</span>
    </React.Fragment>
  );
};

ProgramItem.propTypes = {
  program: PropTypes.object,
};

//////////////////////////////
// Component
//////////////////////////////
const GridItem = (props) => {
  const {
    type,
    machine,
    removeMachine,
    isExpanded
  } = props;

  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = gridItemContentsStyles({ isExpanded });

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    if (!isExpanded) {
      history.push(`/${machine.id}`);
    } else {
      history.push(`/`);
    }
  };

  const handleRemoveMachine = () => {
    removeMachine(machine.id);
    handleOptionsClose();
  };

  return (
    <Container className={classes.root}>
      <Grid container className={classes.grid} justify="space-between">
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          className={classes.top}
        >
          <Grid item>
            {type === "machine" ? (
              <DesktopMacOutlinedIcon />
            ) : (
              <DesktopMacOutlinedIcon />
            )}
          </Grid>
          <Grid item>
            <Box ml={"0.5rem"}>
              <Typography>
                {type === "machine" ? machine.name : props.program.name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.optionsColumn}
        >
          <Grid item>
            <IconButton
              aria-label="options"
              size="small"
              onClick={handleOptionsClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="options-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleOptionsClose}
            >
              <MenuItem onClick={handleRemoveMachine}>Remove</MenuItem>
              {/*<MenuItem onClick={handleClose}>Duplicate</MenuItem>*/}
            </Menu>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="options"
              size="small"
              onClick={handleExpandClick}
            >
              {isExpanded && <ZoomOutIcon />}
              {!isExpanded && <ZoomInIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            {!isExpanded && (
              <IconButton
                aria-label="options"
                size="small"
                className="draggable"
              >
                <OpenWithIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

{
  /*{type === "machine" && <MachineItem {...props} />}*/
}
{
  /*{type === "program" && <ProgramItem {...props} />}*/
}

//////////////////////////////
// Connections
//////////////////////////////
GridItem.propTypes = {
  type: PropTypes.string.isRequired,
  machine: PropTypes.object,
  program: PropTypes.object,
  removeMachine: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  // index: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  removeMachine,
};

export default connect(null, mapDispatchToProps)(GridItem);
