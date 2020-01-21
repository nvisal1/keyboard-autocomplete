import React from 'react';
import './App.css';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Input from './input/input';
import Farley from './Farley/Farley';
import { Candidate } from '../shared/types/Candidate';
import TrainForm from './train-form/train-form';
import { AUTOCOMPLETE_PROVIDER } from '../drivers';

enum Modes {
  SEARCH = 'Search',
  TRAIN = 'Train',
  BOTH = 'Search & Train',
}

const modes = [ Modes.SEARCH, Modes.TRAIN, Modes.BOTH ];

interface AppState {
  candidates: Candidate[];
  farleySteps: number;
  text: string;
  mode: string;
  error: {
    message: string,
    isError: boolean,
  }
}

const MAX_FARLEY_STEPS = window.innerWidth - 500;

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
        candidates: [],
        farleySteps: 0,
        text: '',
        mode: 'Search',
        error: {
          message: '',
          isError: false,
        },
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

        <div 
          className='Autocomplete-client__Farley-container'
          style={ { marginLeft: this.state.farleySteps + 'px' } }>
          <Farley 
            errorMessage={ this.state.error.isError ? this.state.error.message : undefined }
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

  renderInput(): JSX.Element {
    if (this.state.mode === Modes.TRAIN) {
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
            handleInput={ this.handleInputChange }
            text={ this.state.text }
          ></Input>
        </div>
      );
    }
  }

  handleModeChange = (mode: string) => {
    this.setState({ mode });
  }

  handleInputChange = async(text: string): Promise<void> => {
    this.setState({ text });
    
    const currentFragment = this.getCurrentWordFragment(text);

    const candidates = await this.getCandidates(currentFragment);

    if (candidates) {
      this.setState({ 
        candidates, 
        farleySteps: this.calculateFarleySteps(text),
      });
    }
  }

  handleTrainSubmission = (passage: string): void => {
    try {
      if (passage) {
        AUTOCOMPLETE_PROVIDER.train(passage);
      }
    } catch (error) {
      this.setState({ error: { message: error.message, isError: true }});
    }
  }

  handleCandidateSelection = (word: string): void => {
    const updatedInputText = this.generateUpdatedInputText(word);
    this.setState({ text: updatedInputText, candidates: [] });
  }

  private getCurrentWordFragment(text: string): string {
    const tokens = text.split(' '); 
    const currentFragment = tokens[tokens.length - 1];
    return currentFragment;
  }

  private async getCandidates(currentFragment: string): Promise<Candidate[] | undefined> {
    try {
      if (currentFragment !== '') {
        const candidates = await AUTOCOMPLETE_PROVIDER.getWords(currentFragment);
        return candidates;
      }
      return [];
    } catch (error) {
      this.setState({ error: { message: error.message, isError: true }});
    }
  }

  private calculateFarleySteps(text: string) {
    const newFarleyStep = text.length * 15;

    if (MAX_FARLEY_STEPS > newFarleyStep) {
      return newFarleyStep;
    }

    return this.state.farleySteps
  }

  private generateUpdatedInputText(word: string) {
    const tokens = this.state.text.split(' '); 

    tokens[tokens.length - 1] = word;

    let updatedInputText = '';
    tokens.forEach((token: string) => {
      updatedInputText += token + ' ';
    });

    return updatedInputText;
  }

}
export default App;
