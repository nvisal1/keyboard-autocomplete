import React from 'react';
import './speech-bubble.css';
import { Candidate } from '../../../../shared/types/Candidate';
import Farley from '../../Farley';

export interface SpeechBubbleProps {
    handleClick: Function;
    candidates: Candidate[];
    errorMessage?: string;
}

function renderText(candidates: Candidate[], handleClick: Function, errorMessage?: string): JSX.Element | JSX.Element[] {
    if (errorMessage) {
        return renderErrorMessage(errorMessage);
    }

    return renderCandidates(candidates, handleClick);
}

function renderErrorMessage(errorMessage: string): JSX.Element {
    return (
        <p className='speech-bubble__text-container__error-message'>
            { errorMessage }
        </p>
    );
}

function renderCandidates(candidates: Candidate[], handleClick: Function): JSX.Element[] {
    return candidates.map((candidate: Candidate) => {
        return (
            <p 
                className='speech-bubble__text-container__word'
                onClick={ (e) => handleClick(candidate.word) }
                key={ candidate.word }
            >
                { `${candidate.word}(${candidate.confidence})` }
            </p>
        );
    });
}

const SpeechBubble: React.FC<SpeechBubbleProps> = props => {
    const { candidates, handleClick, errorMessage } = props;
    return (
        <div className='speech-bubble'>
            <div className='speech-bubble__Farley-container'>
                <Farley></Farley>
            </div>
            <div className='speech-bubble__text-container'>
                { renderText(candidates, handleClick, errorMessage) }
                <div className='speech-bubble__pointer-container'></div>
            </div>
        </div>
    );
}

export default SpeechBubble;