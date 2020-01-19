import React from 'react';
import './option.css';

interface OptionProps {
    text: string,
    isSelected: boolean,
    handleClick: Function,
}

const Option: React.FC<OptionProps> = props => {

    const { text, isSelected, handleClick } = props;

    return (
        <div 
            className='option-container__text'
            onClick={ () => handleClick(text) }
            style={ isSelected ? { color: '#BE1E2D' } : { color: '#4A4A4A' }}
        >
            { text }
        </div>
    );
}


export default Option;