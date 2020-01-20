import React from 'react';
import './option.css';

export interface OptionProps {
    text: string,
    isSelected: boolean,
    handleClick: Function,
}

const Option: React.FC<OptionProps> = props => {

    const { text, isSelected, handleClick } = props;

    const red = getComputedStyle(document.documentElement).getPropertyValue('--asymmetrik-red');
    const darkGrey = getComputedStyle(document.documentElement).getPropertyValue('--asymmetrik-dark-grey');

    return (
        <div 
            className='option-container__text'
            onClick={ () => handleClick(text) }
            style={ isSelected ? { color: red } : { color: darkGrey }}
        >
            { text }
        </div>
    );
}


export default Option;