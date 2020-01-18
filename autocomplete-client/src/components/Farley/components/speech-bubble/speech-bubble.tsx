import React from 'react';
import './speech-bubble.css';

const SpeechBubble: React.FC<{}> = props => {
    return (
        <div className='speech-bubble'>
            <div className='speech-bubble__text-container'>
                tech
                teach
                teacher
                television
                <div className='speech-bubble__pointer-container'>
                
                </div>
            </div>
            
        </div>
    );
}

export default SpeechBubble;