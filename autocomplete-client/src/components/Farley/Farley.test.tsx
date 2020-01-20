import React from 'react';
import renderer from 'react-test-renderer';

import Farley, { FarleyProps } from './Farley';
import { Candidate } from '../../shared/types/Candidate';

describe('When the Farley component is created', () => {
    describe('and the errorMessage prop is set to null', () => {
        it('should render correctly', () => {
            const requiredProps = getRequiredProps();
            const currentSnapshot = renderer.create(<Farley { ...requiredProps }></Farley>).toJSON();

            expect(currentSnapshot).toMatchSnapshot();
        });
    });
    describe('and the errorMessage prop is set to a truthy string', () => {
        it('should render correctly', () => {
            const requiredProps = getRequiredProps();
            const propsWithErrorMessage = { ...requiredProps, errorMessage: 'test_error_messagge' };
            const currentSnapshot = renderer.create(<Farley { ...propsWithErrorMessage }></Farley>).toJSON();

            expect(currentSnapshot).toMatchSnapshot();
        });
    });
});

function getRequiredProps(): FarleyProps {
   const handleClick = (_: string) => {}; 

   const candidates: Candidate[] = [{ word: 'test_word', confidence: 1}]; 

   return { handleClick, candidates };
}