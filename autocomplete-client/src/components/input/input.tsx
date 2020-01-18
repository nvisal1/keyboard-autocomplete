import React from 'react';
import './input.css';

interface InputProps {
    handleInput: Function,
}

const Input: React.FC<InputProps> = props => {
    return (
        <input className='input'>
       
        </input>
    );
}

export default Input;