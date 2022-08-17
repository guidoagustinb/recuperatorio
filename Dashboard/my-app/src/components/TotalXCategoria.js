import React from "react";
import { Component } from "react";
import TotalCategorias from "./TotalCategorias";

class TotalXCategoria extends Component {
  constructor() {
    super();
    this.state = {
      totalCategory: [],
    };
  }
  componentDidMount() {
    fetch("/api/categories2")
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((count) => {
        //console.log(genres)
        this.setState({ totalCategory: count.id[0] });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <div className="ContenedorListado">
          <h2>Total por Categorias</h2>
          <div>
            {this.state.totalCategory.map((category, index) => {
              return <TotalCategorias {...category} key={index} />;
            })}
            
          </div>
    
        </div>
      </React.Fragment>
    );
  }
}
export default TotalXCategoria;
