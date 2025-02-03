import React, { useState, useRef } from "react";
import "./App.css";
import Inputs from "./components/__organisms/Inputs";

function App() {
  const inputRef = useRef(null);

  return (
    <>
      <Inputs />
    </>
  );
}

export default App;
