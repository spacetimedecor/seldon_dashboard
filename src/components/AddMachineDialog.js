//////////////////////////////
// Import
//////////////////////////////
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addMachine, wsConnect, wsDisconnect, wsSetup} from "../store/actions";
//////////////////////////////
// Component
//////////////////////////////
const AddMachineDialog = (props) => {
  const { open, handleClose, addMachine } = props;

  const [textValue, setTextValue] = React.useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addMachine(textValue);
    handleClose();
    setTextValue("");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Machine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new machine.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Machine name"
            type="text"
            fullWidth
            onChange={(v) => {
              setTextValue(v.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//////////////////////////////
// Connections
//////////////////////////////
AddMachineDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addMachine: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addMachine
};

export default connect(null, mapDispatchToProps)(AddMachineDialog);