import React, {Component} from 'react';
import './PeliculasTop.css';
import CardTop from '../CardTop/CardTop'
import FilterField from '../FilterField/FilterField' 

class PeliculasTop extends Component{
    constructor(){
        super();
        this.state = {
            peliculas:[],
            peliculasIniciales: [],
            nextUrl : '',
            orientacion: 'column',
            render: ''

        }
    }
    componentDidMount(){
        console.log("Se cargo el componente");
        let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=1';

        fetch(url)
            .then(respuesta => {
                return respuesta.json()
            })    
            .then((data) => {
                console.log(data);
                this.setState({
                    peliculas: data.results,
                    peliculasIniciales: data.results,
                    nextUrl: 'https://api.themoviedb.org/3/movie/top_rated?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=2'
                })
            })
            .catch(error => console.log(error))

        }

    masPeliculas(){
        let url = this.state.nextUrl
        fetch(url)
        .then(respuesta =>{
            return respuesta.json()
        })
        .then((data) =>{
            this.setState({
                peliculas : this.state.peliculas.concat(data.results.slice(0,10)),
                nextUrl : 'https://api.themoviedb.org/3/movie/top_rated?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=2'  
            })
        })
    }

    borrarTarjeta(id){
        let peliculasQuedan = this.state.peliculas.filter(pelicula =>{
            return pelicula.id !== id
        })
        this.setState({
            peliculas : peliculasQuedan //es un estado
        })
    }

    filtrarPeliculas(textoAFiltrar){ 
        let peliculasFiltradas = this.state.peliculasIniciales.filter(pelicula=>{  // me estoy trayendo todos los datos que yo tengo adentro de ese estado. 
            return pelicula.original_title.toLowerCase().includes(textoAFiltrar.toLowerCase()) 
            //tolowecase():agarrar lo que se tiene atrapado y lo pone en minuscula
            //includes() verifica si realmente el dato q me esta llegado realmente existe o no
        }) 
        this.setState({ //actualizo los personajes
            peliculas : peliculasFiltradas,
            render: false
        }) 
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 1000)

        // Todos esto lo tengo que pasar al compenente hijo (filterField), quien va a llamar al metodo
    }

    cambiarOrientacion(orientacion){
        this.setState({
            orientacion: orientacion
        })
    }


    render(){
        console.log("Rendericé");
        console.log(this.state.peliculas);
        return(
            <React.Fragment>
                <div className='navbusc'>
                    <FilterField filtrarPeliculas = { (texto) => this.filtrarPeliculas(texto) }/>
                    <div className='imagenesnav'>
                        <img onClick={()=>this.cambiarOrientacion('column')} className='vista matriz' src="/assets/images/matriz.png" alt=""/>
                        <img onClick={()=>this.cambiarOrientacion('row')} className='vista lista' src="/assets/images/lista.png" alt=""/>
                    </div>
                </div>
                <div className={`${this.state.orientacion === 'column' ? 
                    'row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center' : 
                    'row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center lista'
                }`}>
                                
                    { 
                        //Con este if ternario controlo por si tarda la carga de datos me aparezca un mensaje que dice cargando aplicación
                        this.state.peliculas.length === 0 ?
                        // <div className='cargando'><h4>Cargando aplicación...</h4></div> :
                        <div className="div">
                        {this.state.render ?
                        <div class="alert alert-danger d-flex align-items-center" role="alert">
                            <div> No hay resultados :(</div>
                        </div>:
                        <button class="spinner btn btn-primary" id="mydiv" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>}
                         </div>:
                        this.state.peliculas.map((pelicula, index)=><CardTop key={pelicula.original_title + index} dataPelicula={pelicula}
                        //Aqui debemos pasarle el método (borrarTarjeta) al hijo
                        borrar = {(idEliminar) => this.borrarTarjeta(idEliminar) } // dentro de la propiedad borrar le pasamos al hijo, como si fuese una props més, el método de borrarTarjeta(). Dentro de este le pasamos unas props, donde le pasamos un método (idEliminar). Despues de la "=>" llamo al metodo que quiero pasarle al hijo con el this.borrarTajeta(). El idEliminar es el partametro que tiene que mandar el hijo al padre para poder eliminar la tarjeta
                        />) 
                    }  
                </div>
                {
                    this.state.peliculas.length !== 0 ?
                    <div className="mas-pelis">
                    <button className='btn btn-outline-dark mt-auto' onClick= {() => this.masPeliculas()} >+</button>
                    </div>:
                    ''
                }
            </React.Fragment>
        )
    }
}

export default PeliculasTop;