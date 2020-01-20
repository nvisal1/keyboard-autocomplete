import React from 'react';
import './speech-bubble.css';
import { Candidate } from '../../../../shared/types/Candidate';

interface SpeechBubbleProps {
    handleClick: Function;
    candidates: Candidate[];
    errorMessage: string;
}

function renderText(errorMessage: string, candidates: Candidate[], handleClick: Function): JSX.Element | JSX.Element[] {
    if (errorMessage) {
        return renderErrorMessage(errorMessage);
    }

    return renderCandidates(candidates, handleClick);
}

function renderErrorMessage(errorMessage: string): JSX.Element {
    return (
        <p className='speech-bubble__text-container__error-message'>{ errorMessage }</p>
    );
}

function renderCandidates(candidates: Candidate[], handleClick: Function): JSX.Element[] {
    return candidates.map((candidate: Candidate) => {
        return (
            <p 
            className='speech-bubble__text-container__word'
            onClick={ (e) => handleClick(candidate.word) }
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
            <div className='speech-bubble__text-container'>
                { renderText(errorMessage, candidates, handleClick) }
                <div className='speech-bubble__pointer-container'></div>
            </div>
            
        </div>
    );
}

export default SpeechBubble;