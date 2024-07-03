import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableView from "./components/TableView";
import SocketManager from "./SocketManager";
import { TickerData } from "./types";
import Spinner from "./components/Spinner"; // Assuming Spinner is in components folder

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const App: React.FC = () => {
  const [data, setData] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socketManager = new SocketManager("wss://fstream.binance.com/ws");

    const handleData = (newData: TickerData[]) => {
      if (Array.isArray(newData)) {
        setData(newData);
        setLoading(false);
      } else {
        console.error("Received data is not an array", newData);
      }
    };

    socketManager.addListener(handleData);

    // Check the WebSocket readyState
    if (socketManager.readyState === WebSocket.OPEN) {
      setLoading(false);
    }

    return () => {
      socketManager.removeListener(handleData);
      socketManager.disconnect();
    };
  }, []);

  return (
    <Container>
      <h1>Real-Time Data Table</h1>
      {loading ? <Spinner /> : <TableView data={data} />}
    </Container>
  );
};

export default App;
