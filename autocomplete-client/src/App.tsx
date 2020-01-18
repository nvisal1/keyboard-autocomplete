import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Input from './components/input/input';
import Farley from './components/Farley/Farley';

const App: React.FC = () => {
  return (
    <div className='Autocomplete-client'>
      <div className='Autocomplete-client__Navbar-container'>
        <Navbar></Navbar>
      </div>

      <div className='Autocomplete-client__Input-container '>
        <Input handleInput = { handleInput }></Input>
      </div>

      <div className='Autocomplete-client__Farley-container'>
        <Farley></Farley>
      </div>

      <div className='Autocomplete-client__Footer-container'>
        <Footer></Footer>
      </div>

    </div>
  );
}

function handleInput(text: string) {
  console.log(text);
}

export default App;
