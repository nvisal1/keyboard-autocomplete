import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('When the App component is created', () => {
    it('should render correctly', () => {
        const currentSnapshot = renderer.create(<App></App>).toJSON();

        expect(currentSnapshot).toMatchSnapshot();
    });
});
