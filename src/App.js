import React from 'react';
import Navbar from './components/Navbar/Navbar';
import PeliculasPopu from './components/PeliculasPopu/PeliculasPopu';
import PeliculasTop from './components/PeliculasTop/PeliculasTop';
import PeliculasNP from './components/PeliculasNP/PeliculasNP';
import PeliculasUp from './components/PeliculasUp/PeliculasUp';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Navbar />
      </nav>
      <div className='py-5'>
        <div className='container px-4 px-lg-5 mt-5'>
            <div className='title_catego'>
              <h3> Películas más populares </h3>
            </div>
            <PeliculasPopu />
        </div>
      </div>
      <div className='py-5'>
        <div className='container px-4 px-lg-5 mt-5'>
            <div className='title_catego'>
              <h3> Películas más rankeadas </h3>
            </div>
            <PeliculasTop />
        </div>
      </div>
      <div className='py-5'>
        <div className='container px-4 px-lg-5 mt-5'>
            <div className='title_catego'>
              <h3> Películas en cartelera </h3>
            </div>
            <PeliculasNP />
        </div>
      </div>
      <div className='py-5'>
        <div className='container px-4 px-lg-5 mt-5'>
            <div className='title_catego'>
              <h3> Películas a estrenarse </h3>
            </div>
            <PeliculasUp />
        </div>
      </div>
      <footer className='py-5 bg-dark'>
        <Footer />
      </footer> 

    </React.Fragment>
  );
}

export default App;
