import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Input from './components/input/input';
import Farley from './components/Farley/Farley';
import server from './shared/server';
import { Candidate } from './shared/types/Candidate';

interface AppState {
  candidates: Candidate[];
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
        candidates: []
    }
  }

  render() { 
    return (
      <div className='Autocomplete-client'>
        <div className='Autocomplete-client__Navbar-container'>
          <Navbar></Navbar>
        </div>

        <div className='Autocomplete-client__Input-container '>
          <Input handleInput = { this.handleInput }></Input>
        </div>

        <div className='Autocomplete-client__Farley-container'>
          <Farley candidates={ this.state.candidates }></Farley>
        </div>

        <div className='Autocomplete-client__Footer-container'>
          <Footer></Footer>
        </div>
      </div>
    );
  }

  handleInput = async(text: string): Promise<void> => {
    try {
      const tokens = text.split(' '); 
      const currentFragment = tokens[tokens.length - 1];
      const response = await server().get(`/candidates?text=${ currentFragment }`);
      const candidates: Candidate[] = response.data;
      this.setState({ candidates });
    } catch (error) {
      this.setState({ candidates: [] });
    }
  }
}
export default App;
