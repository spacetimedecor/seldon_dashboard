// React
import React from "react";
import { render } from "react-dom";

// Components
import App from "./components/App";

// Providers
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

// Middleware
import logger from "redux-logger";
import socket from "./middleware/socket";

// State
import { createStore, applyMiddleware, compose } from "redux";
import { defaultState } from "./store";
import reducers from "./store/reducers";

// Style
import "./styles/index.css";
import "fontsource-roboto";
import { createMuiTheme } from "@material-ui/core/styles";
import { defaultTheme } from "./styles/theme";
import Layout from "./components/Layout";

// Instances
const middleware = [logger, socket];
const theme = createMuiTheme(defaultTheme);
const store = createStore(
  reducers,
  defaultState,
  // applyMiddleware(logger)
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
