import React from 'react';
import renderer from 'react-test-renderer';

import Farley from './Farley';

describe('When the Farley component is created', () => {
    describe('and the errorMessage prop is set to null', () => {
        it('should render correctly', () => {
            const currentSnapshot = renderer.create(<Farley></Farley>).toJSON();

            expect(currentSnapshot).toMatchSnapshot();
        });
    });
});
