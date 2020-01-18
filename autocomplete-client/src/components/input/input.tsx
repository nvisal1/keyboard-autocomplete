import React from 'react';
import './input.css';

interface InputProps {
    handleInput: Function,
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
            <input 
                className='input'
                value={ this.state.text }
                onChange={ this.handleOnChangeEvent.bind(this) }
            ></input>
        );
    }
    
}

export default Input;