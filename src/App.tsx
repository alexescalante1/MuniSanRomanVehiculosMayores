import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutersApp from "./Main/Routes/Routers";

function App() {
  return (
    <BrowserRouter>
      <RoutersApp />
    </BrowserRouter>
  );
}

export default App;