import React from 'react';
import './App.css';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Input from './input/input';
import { Candidate } from '../shared/types/Candidate';
import TrainingForm from './training-form/training-form';
import { AUTOCOMPLETE_PROVIDER } from '../drivers';
import SpeechBubble from './speech-bubble/speech-bubble';

enum Modes {
  SEARCH = 'Search',
  TRAIN = 'Train',
  BOTH = 'Search & Train',
}

const modes = [ Modes.SEARCH, Modes.TRAIN, Modes.BOTH ];

interface AppState {
  candidates: Candidate[];
  farleySteps: number;
  searchText: string;
  formText: string;
  mode: string;
  error: {
    message: string,
    isError: boolean,
  }
}

const MAX_FARLEY_STEPS = window.innerWidth - 500;
const MIN_FARLEY_STEPS = 40;

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
        candidates: [],
        farleySteps: 40,
        searchText: '',
        formText: '',
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

        { this.renderSpeechBubble() }

        { this.renderInput() }  

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
          <TrainingForm
            text={ this.state.formText }
            handleSubmit={ this.handleTrainSubmission }
            handleInput={ this.handleFormInputChange }
          ></TrainingForm>
        </div>
      );
    } else {
      return (
        <div className='Autocomplete-client__Input-container'>
          <Input 
            handleInput={ this.handleInputChange }
            text={ this.state.searchText }
          ></Input>
        </div>
      );
    }
  }

  renderSpeechBubble(): JSX.Element | void {
    if (this.state.mode !== Modes.TRAIN) {
      return (
        <div 
          className='Autocomplete-client__speech-bubble-container'
          style={ { paddingLeft: this.state.farleySteps + 'px' } }>
          <SpeechBubble
            errorMessage={ this.state.error.isError ? this.state.error.message : undefined }
            candidates={ this.state.candidates }
            handleClick={ this.handleCandidateSelection }
          ></SpeechBubble>
        </div>
      );
    }
  }

  handleModeChange = (mode: string) => {
    this.setState({ mode });
  }

  handleInputChange = async(text: string): Promise<void> => {
    this.setState({ searchText: text });
    
    const currentFragment = this.getCurrentWordFragment(text);

    const candidates = await this.getCandidates(currentFragment);

    if (candidates) {
      this.setState({ 
        candidates, 
        farleySteps: this.calculateFarleySteps(text),
      });
    }
  }

  handleFormInputChange = (text: string): void => {
    this.setState({ formText: text });
  }

  handleTrainSubmission = (passage: string): void => {
    try {
      if (passage) {
        AUTOCOMPLETE_PROVIDER.train(passage);
        this.setState({ formText: '', mode: Modes.SEARCH });
      }
    } catch (error) {
      this.setState({ error: { message: error.message, isError: true }});
    }
  }

  handleCandidateSelection = (word: string): void => {
    const updatedInputText = this.generateUpdatedInputText(word);
    this.setState({ searchText: updatedInputText, candidates: [] });
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

    if (MAX_FARLEY_STEPS >= newFarleyStep && MIN_FARLEY_STEPS <= newFarleyStep) {
      return newFarleyStep;
    }

    if (MIN_FARLEY_STEPS > newFarleyStep) {
      return MIN_FARLEY_STEPS;
    }

    return this.state.farleySteps
  }

  private generateUpdatedInputText(word: string) {
    const tokens = this.state.searchText.split(' '); 

    tokens[tokens.length - 1] = word;

    let updatedInputText = '';
    tokens.forEach((token: string) => {
      updatedInputText += token + ' ';
    });

    return updatedInputText;
  }

}
export default App;
