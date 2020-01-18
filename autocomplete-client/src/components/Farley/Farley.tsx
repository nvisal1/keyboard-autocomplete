import React from 'react';
import FarleyImage from '../../shared/images/Farley.png';
import SpeechBubble from './components/speech-bubble/speech-bubble';
import './Farley.css';

const Farley: React.FC<{}> = props => {
    return (
        <div className='farley'>
            <img className='farley__image-container' src={FarleyImage} alt='Farley'/>
            <div className='farley__speech-bubble-container'>
                <SpeechBubble></SpeechBubble>
            </div>
        </div>
    );
}

export default Farley;