import React from "react";
import "./App.css";
import { AgencyHierarchy } from "./components/tree-builder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AgencyHierarchy />
      </header>
    </div>
  );
}

export default App;
