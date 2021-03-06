//////////////////////////////
// Imports
//////////////////////////////

// React
import React from "react";
import { render } from "react-dom";

// Components
import App from "./components/App";

// Providers
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Middleware
import logger from "redux-logger";
import socket from "./middleware/socket";

// State
import { createStore, applyMiddleware, compose } from "redux";
import { defaultState } from "./store";
import reducers from "./store/reducers";

// Style
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "./styles/index.css";
import "fontsource-roboto";
import { createMuiTheme } from "@material-ui/core/styles";
import { defaultTheme } from "./styles/theme";

//////////////////////////////
// Instances
//////////////////////////////
// const middleware = [socket];
const middleware = [logger, socket];
const theme = createMuiTheme(defaultTheme);
const store = createStore(
  reducers,
  defaultState,
  applyMiddleware(socket)
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
);

//////////////////////////////
// Renderer
//////////////////////////////
render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
