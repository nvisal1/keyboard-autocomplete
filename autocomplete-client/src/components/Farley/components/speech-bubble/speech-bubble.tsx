import React from 'react';
import './speech-bubble.css';
import { Candidate } from '../../../../shared/types/Candidate';

interface SpeechBubbleProps {
    candidates: Candidate[];
}

function renderCandidates(candidates: Candidate[]) {
    return candidates.map((candidate: Candidate) => {
        return (
            <p className='speech-bubble__text-container__word'>{ candidate.word }</p>
        );
    });
}

const SpeechBubble: React.FC<SpeechBubbleProps> = props => {
    return (
        <div className='speech-bubble'>
            <div className='speech-bubble__text-container'>
                { renderCandidates(props.candidates) }
                <div className='speech-bubble__pointer-container'>
                
                </div>
            </div>
            
        </div>
    );
}

export default SpeechBubble;