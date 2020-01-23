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
  searchText: string;
  bothText: string;
  trainingPassage: string;

  mode: string;
  error: {
    message: string,
    isError: boolean,
  }
}

const MAX_FARLEY_STEPS = window.innerWidth - 500;
const MIN_FARLEY_STEPS = 40;

class App extends React.Component<{}, AppState> {

  state = {
      candidates: [],
      searchText: '',
      bothText: '',
      trainingPassage: '',
      mode: Modes.SEARCH,
      error: {
        message: '',
        isError: false,
      },
  }
  
  render() { 
    return (
      <div className='Autocomplete-client'>
        <div className='Autocomplete-client__Navbar-container'>
          <Navbar 
            selectedOption={ this.state.mode }
            options={ modes }
            handleClick={ this.handleNavbarModeChange }
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

  /**
   * renderInput uses the current mode to determine
   * which component to render.
   */
  renderInput(): JSX.Element {
    switch(this.state.mode) {
      case Modes.TRAIN:
        return (
          <div className='Autocomplete-client__Training-Form-container'>
            <TrainingForm
              text={ this.state.trainingPassage }
              handleSubmit={ this.handleTrainingFormSubmission }
              handleInput={ this.handleTrainingFormInputChange }
            ></TrainingForm>
          </div>
        );
      case Modes.BOTH:
        return (
          <div className='Autocomplete-client__Input-container'>
            <Input 
              handleInput={ this.handleBothModeInputChange }
              text={ this.state.bothText }
            ></Input>
          </div>
        );
      default:
        return (
          <div className='Autocomplete-client__Input-container'>
            <Input 
              handleInput={ this.handleSearchModeInputChange }
              text={ this.state.searchText }
            ></Input>
          </div>
        );
    }
  }

  /**
   * renderSpeechBubble renders the Speech Bubble
   * componet for every mode except TRAIN.
   */
  renderSpeechBubble(): JSX.Element | void {
    if (this.state.mode !== Modes.TRAIN) {
      return (
        <div className='Autocomplete-client__Speech-Bubble-container'>
          <SpeechBubble
            errorMessage={ this.state.error.isError ? this.state.error.message : undefined }
            candidates={ this.state.candidates }
            handleClick={ this.handleSpeechBubbleCandidateSelection }
          ></SpeechBubble>
        </div>
      );
    }
  }

  /**
   * handleNavbarModeChange is used to update the
   * curently selected mode.
   */
  handleNavbarModeChange = (mode: Modes): void => {
    this.setState({ mode });
  }

  /**
   * handleSearchModeInputChange locates current fragment of text
   * that the user is typing and uses it to query for a list of
   * Candidates.
   */
  handleSearchModeInputChange = async(text: string): Promise<void> => {
    this.setState({ searchText: text });
    
    const currentFragment = this.getWordFragmentFromEnd(text, 1);

    const candidates = await this.getCandidates(currentFragment);

    if (candidates) {
      this.setState({ candidates });
    }
  }

  /**
   * handleBothModeInputChange accepts the value of an input. If the 
   * last character is a space, find the previous word and use it to
   * train the algorithm. Otherwise, get a list of Candidates.
   */
  handleBothModeInputChange = async(text: string): Promise<void>  => {
    this.setState({ bothText: text });

    const currentWordFragment = this.getWordFragmentFromEnd(text, 1);

    // The user just entered a space, indicating the end of a word.
    // Locate the previous word and use it to train the algorithm.
    // If the text is completely empty, do not train and proceed
    // to update Candidate list.
    if (!currentWordFragment && text.length) {
      const fragment = this.getWordFragmentFromEnd(text, 2);
      this.train(fragment);

    // The user is typing a word, get the current word fragment
    // and use it to query for a list of Candidates.
    } else {
      const candidates = await this.getCandidates(currentWordFragment);

      if (candidates) {
        this.setState({ candidates });
      }
    }
  }

  /**
   * handleTrainingFormInputChange is used to update
   * the state of trainingPassage.
   */
  handleTrainingFormInputChange = (text: string): void => {
    this.setState({ trainingPassage: text });
  }

  /**
   * handleTrainingFormSubmission accepts a user-submitted training
   * passage and uses it to train the autocomplete algorithm. 
   */
  handleTrainingFormSubmission = (passage: string): void => {
    this.train(passage);
    this.setState({ mode: Modes.SEARCH });
  }

  /**
   * handleSpeechBubbleCandidateSelection accepts the word property
   * of a selected Candidate and uses it to update the text in the
   * relevant input.
   */
  handleSpeechBubbleCandidateSelection = (word: string): void => {
    let updatedInputText: string;

    switch(this.state.mode) {
      case Modes.SEARCH:
        updatedInputText = this.generateUpdatedInputText(word, this.state.searchText);
        this.setState({ searchText: updatedInputText, candidates: [] });
        break;
      
      case Modes.BOTH:
        updatedInputText = this.generateUpdatedInputText(word, this.state.bothText);
        this.setState({ bothText: updatedInputText, candidates: [] });
        break;

    }
  }

  /**
   * getWordFragmentFromEnd accepts a passage of text and locates
   * a word fragment at a specified position, starting from the end
   * of the given passage. It does this by subtracting the given
   * index from the length of given passage. For example, if the
   * passage is `Hello There`. Providing an index value of 1 would
   * yield the word `There`. Providing an index value of 2 would
   * yield ` `.
   */
  private getWordFragmentFromEnd(passage: string, index: number): string {
    const tokens = passage.split(' '); 
    const currentFragment = tokens[tokens.length - index];
    return currentFragment;
  }

  /**
   * getCandidates accepts a word fragment and uses it to query for a list
   * of Candidates. If the Autocomplete Provider throws an error, this function
   * will update the error state.
   */
  private async getCandidates(fragment: string): Promise<Candidate[] | undefined> {
    try {
      const candidates = await AUTOCOMPLETE_PROVIDER.getWords(fragment);
      return candidates;
    } catch (error) {
      this.setState({ error: { message: error.message, isError: true }});
    }
  }

  /**
   * train accepts a text passage and uses it to train
   * the autocomplete algorithm. If the Autocomplete 
   * Provider throws an error, this function will update 
   * the error state.
   */
  private async train(passage: string): Promise<void> {
    try {
      AUTOCOMPLETE_PROVIDER.train(passage);
    } catch (error) {
      this.setState({ error: { message: error.message, isError: true }});
    }
  }

  /**
   * generateUpdatedInputText accepts a selected word
   * and uses it to create an updated passage. This is
   * done by replacing the last word fragment in the
   * given passage with the given word.
   */
  private generateUpdatedInputText(word: string, passage: string) {
    const tokens = passage.split(' '); 

    tokens[tokens.length - 1] = word;

    let updatedInputText = '';
    tokens.forEach((token: string) => {
      updatedInputText += token + ' ';
    });

    return updatedInputText;
  }

}

export default App;
