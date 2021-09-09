import React, {Component} from 'react';
import './Assets/css/App.css';

//Import de componentes
import Buscador from "./Components/Buscador"
import Resultados from "./Components/Resultados";

class App extends Component{

  state={
    termino: "",
    imagenes: [],
    pagina: ''
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;

    if(pagina===1) return null;
    
    pagina--;
    
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
    // console.log(pagina);
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    
    pagina++;
    
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
    // console.log(pagina);
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  consultarApi = () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=20248712-7eb2f0b137c865dba86fda6de&q=${termino}&per_page=30&page=${pagina}`

    //console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(resultado => this.setState({imagenes: resultado.hits}))

  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  } 

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultados
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
