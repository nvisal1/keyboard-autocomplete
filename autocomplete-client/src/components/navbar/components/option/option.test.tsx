import React from 'react';
import renderer from 'react-test-renderer';

import Option, { OptionProps } from './option';

describe('When the Option component is created', () => {
    describe('and the isSelected prop is set to true', () => {
        it('should render correctly', () => {
            const requiredProps = getRequiredProps(true);
            const currentSnapshot = renderer.create(<Option { ...requiredProps }></Option>).toJSON();
    
            expect(currentSnapshot).toMatchSnapshot();
        });
    });
    describe('and the isSelected prop is set to false', () => {
        it('should render correctly', () => {
            const requiredProps = getRequiredProps(false);
            const currentSnapshot = renderer.create(<Option { ...requiredProps }></Option>).toJSON();
    
            expect(currentSnapshot).toMatchSnapshot();
        });
    });
});

function getRequiredProps(isSelected: boolean): OptionProps {
   const handleClick = (_: string) => {}; 

   const text = 'test_option';

   return { handleClick, isSelected, text };
}