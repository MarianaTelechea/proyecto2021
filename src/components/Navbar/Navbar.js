import React, {Component} from 'react';

class Navbar extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
    return(
        <React.Fragment>
            <div className="container px-4 px-lg-5 imagenmov">
                <img className='navbar-brand imgbusc' src="/assets/images/logo.jpg" alt=""/> 
            </div>
        </React.Fragment>
    )
    }
}

export default Navbar;