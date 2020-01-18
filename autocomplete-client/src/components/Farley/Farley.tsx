import React from 'react';
import FarleyImage from '../../shared/images/Farley.png';
import './Farley.css';

const Farley: React.FC<{}> = props => {
    return (
        <div className='farley'>
            <img src={FarleyImage} alt='Farley'/>
        </div>
    );
}

export default Farley;