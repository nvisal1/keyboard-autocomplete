import React from 'react';
import './navbar.css';
import Option from './components/option/option';

const options = new Map([
    ['Train', false],  
    ['Search', true],
    ['Search & Train', false],
]);

let currentSelectionKey = 'search';

function renderOptionList() {
    const iterableOptions = Array.from(options.entries());
    return iterableOptions.map((option) => {
        const key = option[0];
        const value = option[1];
      return (
        <Option 
            key= { key }
            text= { key }
            isSelected = { value }
            handleClick = { selectOption }
        ></Option>
      );
    });
}

function selectOption(option: string) {
    options.set(currentSelectionKey, false);
    options.set(option, true);
    currentSelectionKey = option; 
}

const Navbar: React.FC<{}> = props => {
    return (
        <div className='navbar'>
            <div className='navbar__options-container'>
                { renderOptionList() }
            </div>
        </div>
    );
}

export default Navbar;