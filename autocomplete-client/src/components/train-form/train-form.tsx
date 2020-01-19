import React from 'react';
import './train-form.css';

interface TrainFormProps {
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
        <form className='navbar' onSubmit={ (e) => { onSubmit(e, handleSubmit) } }>
            <textarea name='training-passage' cols={ 30 } rows= { 10 }></textarea>
            <button>Submit</button>
        </form>
    );
}

export default TrainForm;