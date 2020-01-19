import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Input from './components/input/input';
import Farley from './components/Farley/Farley';
import server from './shared/server';
import { Candidate } from './shared/types/Candidate';
import TrainForm from './components/train-form/train-form';

const modes = ['Search', 'Train', 'Search & Train'];

interface AppState {
  candidates: Candidate[];
  farleySteps: number;
  text: string;
  mode: string;
}

const MAX_FARLEY_STEPS = window.innerWidth - 500;

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
        candidates: [],
        farleySteps: 0,
        text: '',
        mode: modes[0],
    }
  }

  render() { 
    return (
      <div className='Autocomplete-client'>
        <div className='Autocomplete-client__Navbar-container'>
          <Navbar 
            selectedOption={ this.state.mode }
            options={ modes }
            handleClick={ this.handleModeChange }
          ></Navbar>
        </div>

        { this.renderInput() }  

        <div className='Autocomplete-client__Farley-container' style={ { marginLeft: this.state.farleySteps + 'px' } }>
          <Farley 
            candidates={ this.state.candidates }
            handleClick={ this.handleCandidateSelection }
          ></Farley>
        </div>

        <div className='Autocomplete-client__Footer-container'>
          <Footer></Footer>
        </div>
      </div>
    );
  }

  renderInput() {
    if (this.state.mode === 'Search') {
      return (
        <div className='Autocomplete-client__train-form-container'>
          <TrainForm
            handleSubmit={ this.handleTrainSubmission }
          ></TrainForm>
        </div>
      );
    } else {
      return (
        <div className='Autocomplete-client__Input-container'>
          <Input 
            handleInput={ this.handleInput }
            text={ this.state.text }
          ></Input>
        </div>
      );
    }
  }

  handleInput = async(text: string): Promise<void> => {
    try {
      this.setState({  text });
      const tokens = text.split(' '); 
      const currentFragment = tokens[tokens.length - 1];
      const response = await server().get(`/candidates?text=${ currentFragment }`);
      const candidates: Candidate[] = response.data;
      this.setState({ 
        candidates, 
        farleySteps: MAX_FARLEY_STEPS > text.length * 15 ? text.length * 15 : this.state.farleySteps,
      });
    } catch (error) {
      this.setState({ candidates: [] });
    }
  }

  handleCandidateSelection = (word: string): void => {
    const tokens = this.state.text.split(' '); 
    tokens[tokens.length - 1] = word;
    let updatedText = '';
    tokens.forEach((token: string) => {
      updatedText += token + ' ';
    });
    this.setState({ text: updatedText, candidates: [] });
  }

  handleModeChange = (mode: string) => {
    this.setState({ mode });
  }

  handleTrainSubmission = async (passage: string) => {
    const body = { passage };
    await server().post('/train', body);
  }
}
export default App;
