//////////////////////////////
// Imports
//////////////////////////////
import { makeStyles } from '@material-ui/core/styles';
import {blue, green, white, indigo, grey} from "@material-ui/core/colors";

//////////////////////////////
// Defaults
//////////////////////////////
export const defaultTheme = {
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  palette: {
    background: {
      default: grey[300]
    },
    text: {
      primary: grey[700]
    },
    primary: {
      main: indigo['A700'],
    },
    secondary: {
      main: blue[500],
    },
  },
};

//////////////////////////////
// Drawer
//////////////////////////////
const drawerWidth = 200;

export const drawerStyles = makeStyles((theme) => ({
  imageIcon: {
    height: '100%',
    width: 'auto'
  },
  iconRoot: {
    textAlign: 'left',
    // width: '100%',
    // overflow: 'show'
  },
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
    // backgroundColor: grey[300]
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
}));