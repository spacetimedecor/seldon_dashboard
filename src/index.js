import React from 'react';
import {render} from 'react-dom';
import './index.css';
import 'fontsource-roboto';
import App from './App';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from '@material-ui/core/styles';
import {purple, green} from "@material-ui/core/colors";

// THEME
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

// RENDER
render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);