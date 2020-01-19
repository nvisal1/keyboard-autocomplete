import React from 'react';
import FarleyImage from '../../shared/images/Farley.png';
import SpeechBubble from './components/speech-bubble/speech-bubble';
import './Farley.css';
import { Candidate } from '../../shared/types/Candidate';

interface FarleyProps {
    handleClick: Function;
    candidates: Candidate[];
}

const Farley: React.FC<FarleyProps> = props => {
    return (
        <div className='farley'>
            <img className='farley__image-container' src={FarleyImage} alt='Farley'/>
            <div className='farley__speech-bubble-container'>
                <SpeechBubble 
                    candidates={ props.candidates }
                    handleClick={ props.handleClick }
                ></SpeechBubble>
            </div>
        </div>
    );
}

export default Farley;