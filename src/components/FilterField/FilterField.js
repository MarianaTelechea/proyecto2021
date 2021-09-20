import React, {Component} from 'react';
class FilterField extends Component{
    constructor(props){
        super(props) 
        this.state = {
        
            filtrarPor : '' 
        }
    }
    
    evitarEnviar(evento){
        evento.preventDefault() 
    }
    
    controlarCambio(evento){
        this.setState({
            filtrarPor  : evento.target.value 
            
        }, () => this.props.filtrarPeliculas(this.state.filtrarPor)) 
    }
    render(){
        return (
            <React.Fragment> 
                <form onSubmit={ (e) => this.evitarEnviar(e) }>
                    <label for='nombre'> <img className='navbar-brand' src="/assets/images/buscador.png" alt=""/> </label> 
                    <input type = 'text' name='name'id='nombre' onChange={ (e) => this.controlarCambio(e) } value ={this.state.filtrarPor}/> 
                </form>
            </React.Fragment> 
        )
        
    }
}
export default FilterField;
