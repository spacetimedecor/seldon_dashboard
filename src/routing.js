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

class Routing extends React.Component {
  render() {
    return (
      <Layout>
        <Route path={HomeRoute} exact component={Home} />
        <Route path={SettingsRoute} component={Settings} />
        <Route path={MachineRoute} component={Machine} />
      </Layout >
    );
  }
}
export default withRouter(Routing);