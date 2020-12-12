// import React from "react";
// import {io} from 'socket.io-client';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { updateMachineValues } from '../store/actions';
// import { defaultState } from "../store";
// import { URL } from '../config';
//
// export const SocketContext = React.createContext(defaultState);
// export const useWebsocket = () => React.useContext(SocketContext);
//
// class SocketManager extends React.Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//     updateMachineValues: PropTypes.func.isRequired,
//   };
//
//   socket = null;
//   state = {
//     MachineValues: [],
//   };
//
//   constructor(props) {
//     super(props);
//
//     this.socket = io.connect(URL, {
//       transports: ["websocket", "polling"],
//     });
//   }
//
//   componentDidMount() {
//     this.socket.on("MachineValues", this.machineValuesCallback.bind(this));
//   }
//
//   machineValuesCallback(payload) {
//     this.props.updateMachineValues(payload);
//     this.setState({
//       MachineValues: payload,
//     });
//   }
//
//   componentWillUnmount() {
//     this.socket && this.socket.disconnect();
//   }
//
//   render() {
//     return (
//       <SocketContext.Provider value={this.state.MachineValues}>
//         {this.props.children}
//       </SocketContext.Provider>
//     );
//   }
// }
//
// const mapDispatchToProps = {
//   updateMachineValues
// };
//
// export default connect(null, mapDispatchToProps)(SocketManager);