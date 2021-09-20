import React, {Component} from 'react';
import './PeliculasUp.css';
import CardUp from '../CardUp/CardUp'
import FilterField from '../FilterField/FilterField'
class PeliculasUp extends Component{
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
        let url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=1';
        fetch(url)
            .then(respuesta => {
                return respuesta.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    peliculas: data.results,
                    peliculasIniciales: data.results,
                    nextUrl: 'https://api.themoviedb.org/3/movie/upcoming?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=1'
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
                nextUrl : 'https://api.themoviedb.org/3/movie/upcoming?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=1'
            })
        })
    }
    borrarTarjeta(id){
        let peliculasQuedan = this.state.peliculas.filter(pelicula =>{
            return pelicula.id !== id
        })
        this.setState({
            peliculas : peliculasQuedan 
        })
    }
    filtrarPeliculas(textoAFiltrar){ 
        let peliculasFiltradas = this.state.peliculasIniciales.filter(pelicula=>{  
            return pelicula.original_title.toLowerCase().includes(textoAFiltrar.toLowerCase()) 
            
        }) 
        this.setState({ 
            peliculas : peliculasFiltradas,
            render: false
        }) 
        setTimeout(function() { 
            this.setState({render: true}) 
        }.bind(this), 1000)
        
    }
    cambiarOrientacion(orientacion){
        this.setState({
            orientacion: orientacion
        })
    }
    render(){
        
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
                        
                        this.state.peliculas.length === 0 ?
                        
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
                        this.state.peliculas.map((pelicula, index)=><CardUp key={pelicula.original_title + index} dataPelicula={pelicula}
                        
                        borrar = {(idEliminar) => this.borrarTarjeta(idEliminar) } 
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
export default PeliculasUp