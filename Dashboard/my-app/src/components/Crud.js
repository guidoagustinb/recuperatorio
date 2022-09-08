import React from "react";
import "../assets/css/Styles.css";
import CrearProducto from "./CrearProducto.";
import EditarProducto from "./EditarProducto";

function Crud() {
  return (
    <React.Fragment>
      <div className="crud">
        {/* CREAR PRODUCTO */}
        <CrearProducto />

        {/* EDITAR PRODUCTO */}
        <EditarProducto />
      </div>
    </React.Fragment>
  );
}
export default Crud;
