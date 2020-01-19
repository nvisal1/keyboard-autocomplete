import React from 'react';
import './speech-bubble.css';
import { Candidate } from '../../../../shared/types/Candidate';

interface SpeechBubbleProps {
    handleClick: Function;
    candidates: Candidate[];
}

function renderCandidates(candidates: Candidate[], handleClick: Function) {
    return candidates.map((candidate: Candidate) => {
        return (
            <p 
                className='speech-bubble__text-container__word'
                onClick={ (e) => handleClick(candidate.word) }
            >{ `${candidate.word}(${candidate.confidence})` }</p>
        );
    });
}

const SpeechBubble: React.FC<SpeechBubbleProps> = props => {
    return (
        <div className='speech-bubble'>
            <div className='speech-bubble__text-container'>
                { renderCandidates(props.candidates, props.handleClick ) }
                <div className='speech-bubble__pointer-container'></div>
            </div>
            
        </div>
    );
}

export default SpeechBubble;