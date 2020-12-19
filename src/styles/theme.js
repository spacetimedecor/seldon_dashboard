//////////////////////////////
// Imports
//////////////////////////////
import { makeStyles } from '@material-ui/core/styles';
import {blue, green, indigo, grey} from "@material-ui/core/colors";

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
      main: indigo['A100'],
    },
    secondary: {
      main: grey[500],
    },
  },
};

//////////////////////////////
// Drawer
//////////////////////////////
const drawerWidth = 180;

export const layoutStyles = makeStyles((theme) => ({
  imageIcon: {
    height: '100%',
    width: 'auto'
  },
  iconRoot: {
    textAlign: 'left',
    position: 'absolute',
    top: 'calc(50% - 0.85rem)',
    left: '1.15rem'
    // width: '100%',
    // overflow: 'show'
  },
  breadcrumbs: {
    justifyContent: 'center!important',
    color: 'white'
  },
  listItemText: {
    color: grey[600]
  },
  root: {
    display: 'flex'
  },
  toolbar: {
    justifyContent: 'center',
    width: '100%',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    justifyContent: 'center',
    color: grey[700],
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
    padding: theme.spacing(3),
    height: '100vh',
    backgroundImage:
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=)'
  },
}));