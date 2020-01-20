import React from 'react';
import renderer from 'react-test-renderer';

import SpeechBubble, { SpeechBubbleProps } from './speech-bubble';
import { Candidate } from '../../../../shared/types/Candidate';

describe('When the SpeechBubble component is created', () => {
    describe('and the errorMessage prop is set to null', () => {
        it('should render correctly', () => {
            const requiredProps = getRequiredProps();
            const currentSnapshot = renderer.create(<SpeechBubble { ...requiredProps }></SpeechBubble>).toJSON();

            expect(currentSnapshot).toMatchSnapshot();
        });
    });
    describe('and the errorMessage prop is set to a truthy string', () => {
        it('should render correctly', () => {
            const requiredProps = getRequiredProps();
            const propsWithErrorMessage = { ...requiredProps, errorMessage: 'test_error_messagge' };
            const currentSnapshot = renderer.create(<SpeechBubble { ...propsWithErrorMessage }></SpeechBubble>).toJSON();

            expect(currentSnapshot).toMatchSnapshot();
        });
    });
});

function getRequiredProps(): SpeechBubbleProps {
   const handleClick = (_: string) => {} 

   const candidates: Candidate[] = [{ word: 'test_word', confidence: 1 }]; 

   return { handleClick, candidates };
}