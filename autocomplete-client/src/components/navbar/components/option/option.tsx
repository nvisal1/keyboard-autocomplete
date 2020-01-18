import React from 'react';
import './option.css';

interface OptionProps {
    text: string,
    isSelected: boolean,
    handleClick: Function,
}

const Option: React.FC<OptionProps> = props => {
    const { text, isSelected, handleClick } = props;
    if (isSelected) {
        return (
            <div 
                className='option'
                onClick={ () => props.handleClick(text) }
            >
                { text }
            </div>
        );
    } else {
        return (
            <div 
                className='option'
                onClick={ () => props.handleClick(text) }
            >
                { text }
            </div>
        );
    }
}

export default Option;