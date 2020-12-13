import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Home from './pages/Home'
import Settings from './pages/Settings';
import Machine from './pages/Machine';
import Layout from "./components/Layout";
export const HomeRoute = "/";
export const SettingsRoute = "/settings/";
export const MachineRoute = "/machine/:id";
import { AnimatedSwitch } from 'react-router-transition';
import './styles/routing.css'

class Routing extends React.Component {
  render() {
    return (
      <Layout>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route path={HomeRoute} exact component={Home} />
          <Route path={SettingsRoute} exact component={Settings} />
          <Route path={MachineRoute} component={Machine} />
        </AnimatedSwitch>
      </Layout >
    );
  }
}
export default withRouter(Routing);