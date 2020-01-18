import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

const App: React.FC = () => {
  return (
    <div className='Autocomplete-client'>
      <div className='Autocomplete-client__Navbar-container'>
        <Navbar></Navbar>
      </div>

      <div className='Autocomplete-client__Footer-container'>
        <Footer></Footer>
      </div>

    </div>
  );
}

export default App;
