import React, {Component} from 'react';
class FilterField extends Component{
    constructor(props){
        super(props) // Hacer que herede todo lo que va a hacer el componente
        this.state = {
            // Todo el conjunto de valores iniciales y propiedades que va a manejar el componente
            filtrarPor : '' // el estado que yo voy a controlar
        }
    }
    // Creamos el metodo que evite enviar el formulario
    evitarEnviar(evento){
        evento.preventDefault() // atrapa los datos y atraves del evento le decimos q evita q se envie. Estamos hablando del evento que llama Submit
    }
    // Crear metodo para controlar q es lo q el user esta tipeanddo. Lo ue tipea el usaer, se guarda dentro del value
    controlarCambio(evento){
        this.setState({
            filtrarPor  : evento.target.value // esto es lo que el usaer tipeo
            // objeto target y value que cuando lo impactamos sobre los eventos nos trae cual es el valor que el usuario tipio
        }, () => this.props.filtrarPeliculas(this.state.filtrarPor)) //cada vez que yo escriba algo, yo pudiese estar viendo lo que yo estoy tipiando. Por las props yo recibo directamente, cuando se invoca el componente, me mandan unas props que me manda un metodos y ese metodos lo mando a ejecutar, pq es aca donde se logra saber q es lo q el user tipear. Aqui le mando un texto y viaja al componente padre
    }
    render(){
        return (
            <React.Fragment> {/* aca va el codigo jsx que se va a renderizar en este trabajo */}
                <form onSubmit={ (e) => this.evitarEnviar(e) }>
                    <label for='nombre'> <img className='navbar-brand' src="/assets/images/buscador.png" alt=""/> </label> {/* esto es simplemente una etiqueta */}
                    <input type = 'text' name='name'id='nombre' onChange={ (e) => this.controlarCambio(e) } value ={this.state.filtrarPor}/> {/* existe type text, password, file, etc */}
                </form>
            </React.Fragment> 
        )
        // Con for y id, lo que hago q se trabaje de forma dinamica, mejora la experiencia del user. Ya q si me paro en personajes a filtrar, el mouse se posiciona sobre el input
        // necesito evitar que le formulario se envie, por eso se usa el evento (ej, onSunmit) 
        // el evento onChange: logra reconocer todo lo que el user tipea dentro del input, es decir, atrapa el valor. Entonces lo que dice es que cuando se haga el input y el mismo se esta capturando, lo que queremos q haga es que llame al metodo controlarCambio() donde se le pasa como parametro el event que esta ocurriendo. 
    }
}
export default FilterField;
// Teoria
// onSubmit: se le esta llamando a un metodo, que este metodo se le pasa el evento. Event: el evento que acompaña cuando nosotros mandamos la ejecucion del mismo