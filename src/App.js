import React from 'react';
import Navbar from './components/Navbar/Navbar';
import PeliculasPopu from './components/PeliculasPopu/PeliculasPopu';
import PeliculasTop from './components/PeliculasTop/PeliculasTop';

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

    </React.Fragment>
  );
}

export default App;
