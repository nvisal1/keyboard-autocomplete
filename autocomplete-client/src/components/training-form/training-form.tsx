import React from 'react';
import './training-form.css';

export interface TrainingFormProps {
    handleSubmit: Function;
    handleInput: Function;
    text: string;
}

function onSubmit(event: React.FormEvent<HTMLFormElement>, handleSubmit: Function): void {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget);
    const trainingPassage = formData.get('training-passage')
    handleSubmit(trainingPassage);
}


const TrainingForm: React.FC<TrainingFormProps> = props => {
    const { handleSubmit, text } = props;
    return (
        <form className='training-form' onSubmit={ (e) => { onSubmit(e, handleSubmit) } }>
            <textarea  
                className='training-form__textarea'
                name='training-passage'
                cols={ 30 }
                rows={ 10 }
                value={ text }
                onChange={ (e) => props.handleInput(e.target.value) }
            ></textarea>
            <button className='training-form__submit-button'>Submit</button>
        </form>
    );
}

export default TrainingForm;