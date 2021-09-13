import React, {Component} from 'react';
import './PeliculasUp.css';
import CardUp from '../CardUp/CardUp'
// import FilterField from '../FilterField/FilterField' # EL FUTURO BUSCADOR
class PeliculasUp extends Component{
    constructor(){
        super();
        this.state = {
            peliculas:[],
            peliculasIniciales: [],
            nextUrl : ''
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
                peliculas : this.state.peliculas.concat(data.results),
                nextUrl : 'https://api.themoviedb.org/3/movie/upcoming?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=1'
            })
        })
    }
    borrarTarjeta(id){
        let peliculasQuedan = this.state.peliculas.filter(pelicula =>{
            return pelicula.id != id
        })
        this.setState({
            peliculas : peliculasQuedan
        })
    }
    render(){
        console.log("Rendericé");
        console.log(this.state.peliculas);
        return(
            <React.Fragment>
                {/* <div>
                    <FilterField filtrarPersonajes = { (texto) => this.filtrarPersonajes(texto) }/>
                </div> */}
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        this.state.peliculas.length === 0 ?
                        <div className='cargando'><h4>Cargando aplicación...</h4></div> :
                        this.state.peliculas.map((pelicula, index)=><CardUp key={pelicula.original_title + index} dataPelicula={pelicula}
                        borrar = {(idEliminar) => this.borrarTarjeta(idEliminar) }
                        />)
                    }
                    <div className="mas-pelis">
                    <button className='btn btn-outline-dark mt-auto' onClick= {() => this.masPeliculas() } >+</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PeliculasUp