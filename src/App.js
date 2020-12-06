import './App.css';
import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import socket from './services/clientSocket'

function App() {
  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on('testMessage', o => {
      console.log(o);
    });
  }, []);

  return (
    <div className="App">
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;
