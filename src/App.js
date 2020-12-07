import './App.css';
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import socket from './services/clientSocket'

function App() {

  const [MachineValues, setMachineValues] = useState([]);

  useEffect(() => {
    socket.on('MachineValues', o => {
      console.log(o);
      setMachineValues(o);
    });
  }, []);

  return (
    <div className="App">
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      {MachineValues.map(
        (MachineValue, i) =>
          <div key={`MachineValue-${i}`}>
            {MachineValue.Name}
          </div>)
      }
    </div>
  );
}

export default App;
