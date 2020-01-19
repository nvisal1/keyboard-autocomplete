import React from 'react';
import './input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface InputProps {
    handleInput: Function,
   // selectedWord: string,
}

interface InputState {
    text: string,
}

class Input extends React.Component<InputProps, InputState> {

    constructor(props: InputProps) {
        super(props)
        this.state = {
            text: ''
        }
    }

    handleOnChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void { 
        this.setState({ text: event.target.value });
        this.props.handleInput(event.target.value)
    }

    render() {
        return (
            <div className='input-container'>
                <span className='input__icon-cntainer'>
                    <FontAwesomeIcon icon={ faSearch } />
                </span>
                <input 
                    className='input-container__input'
                    value={ this.state.text }
                    onChange={ this.handleOnChangeEvent.bind(this) }
                ></input>
            </div>

        );
    }
    
}

export default Input;