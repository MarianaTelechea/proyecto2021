import React, {Component} from 'react';
import FilterField from '../FilterField/FilterField';


class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculas: [],
            peliculasIniciales: [],
        }
    }

    componentDidMount(){
        console.log("Se cargo el componente");
        let url = 'https://api.themoviedb.org/3/movie/popular?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=1';

        fetch(url)
            .then(respuesta => {
                return respuesta.json()
            })    
            .then((data) => {
                console.log(data);
                this.setState({
                    peliculas: data.results,
                    peliculasIniciales: data.results,
                })
            })
            .catch(error => console.log(error))
    }


    filtrarPeliculas(textoAFiltrar){ 
        let peliculasFiltradas = this.state.peliculasIniciales.filter(pelicula=>{  // me estoy trayendo todos los datos que yo tengo adentro de ese estado. 
            return pelicula.original_title.toLowerCase().includes(textoAFiltrar.toLowerCase()) 
            //tolowecase():agarrar lo que se tiene atrapado y lo pone en minuscula
            //includes() verifica si realmente el dato q me esta llegado realmente existe o no
        }) 
        this.setState({ //actualizo los personajes
            peliculas : peliculasFiltradas
        }) 

        // Todos esto lo tengo que pasar al compenente hijo (filterField), quien va a llamar al metodo
    }

    render(){

    return(
        <React.Fragment>
            <div className="container px-4 px-lg-5">
                <img className='navbar-brand' src="/assets/images/logo.jpg" alt=""/>
                {/* <h1 className='navbar-brand'>MovFly</h1> */}
                <div>
                    <FilterField filtrarPeliculas = { (texto) => this.filtrarPeliculas(texto) }/>
                </div>
            </div>
        </React.Fragment>
    )
    }
}

export default Navbar;