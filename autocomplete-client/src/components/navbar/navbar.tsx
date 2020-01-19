import React from 'react';
import './navbar.css';
import Option from './components/option/option';

interface NavbarProps {
    options: string[];
    selectedOption: string;
    handleClick: Function;
}

function renderOptions(options: string[], selectedOption: string, handleClick: Function) {
    return options.map((option: string) => {
      return (
        <Option 
            key= { option }
            text= { option }
            isSelected = { option === selectedOption }
            handleClick = { handleClick }
        ></Option>
      );
    });
}

const Navbar: React.FC<NavbarProps> = props => {
    const { options, selectedOption, handleClick } = props;
    return (
        <div className='navbar'>
            <div className='navbar__options-container'>
                { renderOptions(options, selectedOption, handleClick)}
            </div>
        </div>
    );
}

export default Navbar;