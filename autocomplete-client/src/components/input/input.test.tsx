import React from 'react';
import renderer from 'react-test-renderer';

import Input from './input';

describe('When the Input component is created', () => {
    it('should render correctly', () => {
        const requiredProps = getRequiredProps();
        const currentSnapshot = renderer.create(<Input { ...requiredProps }></Input>).toJSON();

        expect(currentSnapshot).toMatchSnapshot();
    });
    
});

function getRequiredProps(): { handleInput: Function, text: string } {
   const handleInput = (passage: string) => {
       console.log(passage);
   } 

   const text = 'test_text';

   return { handleInput, text };
}