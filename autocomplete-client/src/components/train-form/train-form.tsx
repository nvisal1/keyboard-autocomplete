import React from 'react';
import './train-form.css';

export interface TrainFormProps {
    handleSubmit: Function;
}

function onSubmit(event: React.FormEvent<HTMLFormElement>, handleSubmit: Function): void {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget);
    const trainingPassage = formData.get('training-passage')
    handleSubmit(trainingPassage);
}


const TrainForm: React.FC<TrainFormProps> = props => {
    const { handleSubmit } = props;
    return (
        <form className='train-form' onSubmit={ (e) => { onSubmit(e, handleSubmit) } }>
            <textarea  
                className='train-form__textarea'
                name='training-passage'
                cols={ 30 }
                rows= { 10 }
            ></textarea>
            <button className='train-form__submit-button'>Submit</button>
        </form>
    );
}

export default TrainForm;