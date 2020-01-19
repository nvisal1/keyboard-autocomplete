import React from 'react';
import './input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface InputProps {
    handleInput: Function,
    text: string,
}

const Input: React.FC<InputProps> = props  => {

    return (
        <div className='input-container'>
            <span className='input__icon-cntainer'>
                <FontAwesomeIcon icon={ faSearch } />
            </span>
            <input 
                className='input-container__input'
                value={ props.text }
                onChange={ (e) => props.handleInput(e.target.value) }
            ></input>
        </div>
    );
}

export default Input;