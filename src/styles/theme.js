import { makeStyles } from '@material-ui/core/styles';
import {blue, green, white, indigo, grey} from "@material-ui/core/colors";

export const defaultTheme = {
  palette: {
    background: {
      default: grey[700]
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

const drawerWidth = 200;

export const drawerStyles = makeStyles((theme) => ({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center',
    width: '100%'
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