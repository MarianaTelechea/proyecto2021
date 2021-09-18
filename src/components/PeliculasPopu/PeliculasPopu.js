import React, {Component} from 'react';
import './PeliculasPopu.css';
import CardPopu from '../CardPopu/CardPopu'
import FilterField from '../FilterField/FilterField' // EL FUTURO BUSCADOR

class PeliculasPopu extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculas:[],
            peliculasIniciales: [],
            nextUrl : '',
            orientacion: 'column',
            render: []
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
                    nextUrl: 'https://api.themoviedb.org/3/movie/popular?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=2',
                    render: false //Set render state to false
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
                nextUrl : 'https://api.themoviedb.org/3/movie/popular?api_key=65eadee9d6749b2ab92f01099d10deeb&language=en-US&page=2'  
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
                        this.state.peliculas.map((pelicula, index)=><CardPopu key={pelicula.original_title + index} dataPelicula={pelicula}
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

export default PeliculasPopu;


// Teoria:

// onClick = es un evento dentro del button que hace el llamado a otro metodo dentro del componente PeliculasPopu. Adentro de ejecuta una arrow function, donde masPeliculas() es un metodo que esta dentro de este componente, por ende antes de este se agrega un this.
// masPeliculas() = es un método, donde se crea un variables que guarda la url del page que ya tengo guardada dentro del estado de nextUrl, mediante el this.state. Luego capturo esa url mediante un fetch(). Dentro de esto yo tengo que guardar los datos que ya tenia (las peliculas del page 1) + los datos que estoy concatenizando en el estado de peliculas. Para lograr esto se debe pegar una nueva url que me traera nuevos personajes de la page 2, para esto se crea un nuevo estado vacio dentro del constructor llamado nextUrl, siendo este su estado original. En el componentDidMount(), al momento de recibir lo datos de la api, agregamos el estado de nextUrl con la url que me trae más peliculas

// Boton borrar: En el componente padre yo debería pasarle al componente hijo el método. Y el hijo invoca el método diciendole al padre quien es el q hay que eliminar. El componente padre lo unico que tiene que hacer es pasarle la props al componente hijo. Lo que le va a mandar al hijo es exactamente un metodo borrarTarjeta(). El componente hijo recibe el metodo y le manda al padre: quiero que ejecutes este metodo y con este valor. Y ese valor es exactamente cual es la tarjeta que se quiere borrar. El el componente padre debo crear un metodo quien es el que va a borrar la tarjeta, quien recibe como un parametro el id. Entonces dentro de este, yo le aplica el método filter del array (sirve para recorrer un array, pero varia de acuerdo a las condiciones que pongo). Esto se pone dentro de una variable, quien va a contener las peliculas que quedan dada la condicion que pusimos, es decir, todas las peliculas que sean distintas al id que recibió el padre del componente hijo. Luego de esto lo que yo debo hacer es actualizar el estado, mediante el this.setState(), aplicandole el estado peliculas quien va a guardar la peliculas que quedan.  