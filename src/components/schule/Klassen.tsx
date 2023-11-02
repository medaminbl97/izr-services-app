import React from "react";
import { Outlet } from "react-router-dom";

function Klassen() {
  return (
    <>
      <Outlet /> <div>Klassen</div>
    </>
  );
}

export default Klassen;
