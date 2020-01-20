import React from 'react';
import renderer from 'react-test-renderer';

import TrainForm, { TrainFormProps } from './train-form';

describe('When the TrainForm component is created', () => {
    it('should render correctly', () => {
        const requiredProps = getRequiredProps();
        const currentSnapshot = renderer.create(<TrainForm { ...requiredProps }></TrainForm>).toJSON();

        expect(currentSnapshot).toMatchSnapshot();
    });
});

function getRequiredProps(): TrainFormProps {
   const handleSubmit = (_: string) => {}; 

   return { handleSubmit };
}