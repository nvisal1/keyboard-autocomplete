import React from 'react';
import renderer from 'react-test-renderer';

import TrainingForm, { TrainingFormProps } from './training-form';

describe('When the TrainingForm component is created', () => {
    it('should render correctly', () => {
        const requiredProps = getRequiredProps();
        const currentSnapshot = renderer.create(<TrainingForm { ...requiredProps }></TrainingForm>).toJSON();

        expect(currentSnapshot).toMatchSnapshot();
    });
});

function getRequiredProps(): TrainingFormProps {
   const handleSubmit = (_: string) => {}; 

   return { handleSubmit };
}