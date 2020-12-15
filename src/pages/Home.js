//////////////////////////////
// Imports
//////////////////////////////
import React from "react";
import { connect } from "react-redux";
import {
  addMachine,
  setPollSpeed,
  switchConnection,
  wsConnect,
  wsDisconnect,
} from "../store/actions";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
//////////////////////////////
// Component
//////////////////////////////
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function Row(props) {
  const { machine } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="medium" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{`${capitalize(machine.name)}`}</TableCell>
        <TableCell>{machine.id}</TableCell>
        <TableCell>{machine.startTime}</TableCell>
        <TableCell>{`${machine.cpu.toFixed(2)}%`}</TableCell>
        <TableCell>{`${machine.memory.toFixed(2)}%`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0}>
              <Typography variant="h6" gutterBottom component="div">
                {`${capitalize(machine.name)}'s Programs`}
              </Typography>
              {/*<DenseTable/>*/}
              <Table size="small" aria-label="programs">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>CPU</TableCell>
                    <TableCell>Memory</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {machine.programValues.map((programValue) => (
                    <TableRow key={programValue.id}>
                      <TableCell component="th" scope="row">{programValue.name}</TableCell>
                      <TableCell>{programValue.id}</TableCell>
                      <TableCell>{programValue.startTime}</TableCell>
                      <TableCell>{`${programValue.cpu.toFixed(2)}%`}</TableCell>
                      <TableCell>{`${programValue.memory.toFixed(2)}%`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  machine: PropTypes.object.isRequired
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Home = (props) => {
  return (
    <React.Fragment>
      <Grid>

      </Grid>
      {/*<TableContainer component={Paper}>*/}
      {/*  <Table aria-label="collapsible table">*/}
      {/*    <TableHead>*/}
      {/*      <TableRow>*/}
      {/*        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>*/}
      {/*          <Typography variant="h6" component="div">*/}
      {/*            Machines*/}
      {/*          </Typography>*/}
      {/*        </TableCell>*/}
      {/*        <TableCell>Name</TableCell>*/}
      {/*        <TableCell>ID</TableCell>*/}
      {/*        <TableCell>Start Time</TableCell>*/}
      {/*        <TableCell>CPU</TableCell>*/}
      {/*        <TableCell>Memory</TableCell>*/}
      {/*      </TableRow>*/}
      {/*    </TableHead>*/}
      {/*    <TableBody>*/}
      {/*      {props.machines.map((machine) => (*/}
      {/*        <Row key={machine.name} machine={machine} />*/}
      {/*      ))}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*</TableContainer>*/}

    </React.Fragment>
  );
};
//////////////////////////////
// Connections
//////////////////////////////
Home.propTypes = {
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
          programValues: MachineValue.ProgramValues.map(programValue => {
            return {
              cpu: programValue.CPU,
              memory: programValue.Memory,
              name: programValue.Name,
              startTime: programValue.StartTime,
              id: programValue.ID
            }
          })
        };
      })
    : [],
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
