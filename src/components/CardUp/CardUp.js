import React, {Component} from 'react';

class CardUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            viewMore: false,
            text:'Ver más',
        }
    }

    viewMore(){
        if(this.state.viewMore){
            this.setState({
                viewMore: false,
                text: 'Ver más'
            })
        } else {
            this.setState({
                viewMore: true,
                text: 'Ver menos'
            })            
        }
    }

    render(){
        return (
            <div className= 'card h-100'>
                <div className='button_borrar'>
                    <button className='btn btn-outline-dark mt-auto borrar' onClick = { () => this.props.borrar(this.props.dataPelicula.id)} > X </button>
                </div>
                <img className='card-img-top' src={`https://image.tmdb.org/t/p/w500/${this.props.dataPelicula.poster_path}`} alt="" />
                <div className='card-body p-4'>
                    <div className="text-center">
                        <h4>{this.props.dataPelicula.original_title}</h4>
                        <p>{this.props.dataPelicula.overview}</p>
                        <h1 className={`${this.state.viewMore ? 'show' : 'hide'}`}>
                            {`Release date: ${this.props.dataPelicula.release_date}`} </h1>
                        <h1 className={`${this.state.viewMore ? 'show' : 'hide'}`}>
                            {`Original language: ${this.props.dataPelicula.original_language}`} </h1>
                        <h1 className={`${this.state.viewMore ? 'show' : 'hide'}`}>
                            {`Vote average: ${this.props.dataPelicula.vote_average}`} </h1>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <button className='btn btn-outline-dark mt-auto' onClick={()=>this.viewMore()}>{this.state.text}</button>
                        </div>
                                    
                        </div>
                </div>
            </div>
        );
    }
}

export default CardUp;