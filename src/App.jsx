import React from "react";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import "./App.css";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </>
  );
}

export default App;
