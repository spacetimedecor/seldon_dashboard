import React from "react";
import { render } from "react-dom";

import "./styles/index.css";
import "fontsource-roboto";

import App from "./components/App";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import logger from "redux-logger";

import SocketManager from "./components/SocketManager";

import { createStore, applyMiddleware } from "redux";
import { defaultState } from "./store";
import reducers from "./store/reducers";

import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import { defaultTheme } from "./styles/theme";

const theme = createMuiTheme(defaultTheme);
const store = createStore(reducers, defaultState, applyMiddleware(logger));

// RENDER
render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketManager>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </SocketManager>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
