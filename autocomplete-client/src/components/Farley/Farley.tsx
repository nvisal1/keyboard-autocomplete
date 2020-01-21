import React from 'react';
import FarleyImage from '../../shared/images/Farley.png';
import './Farley.css';

const Farley: React.FC = props => {
    return (
        <img className='farley__image-container' src={FarleyImage} alt='Farley'/>
    );
}

export default Farley;