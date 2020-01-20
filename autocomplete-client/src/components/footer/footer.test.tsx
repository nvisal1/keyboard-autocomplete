import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer';

describe('When the Footer component is created', () => {
    it('should render correctly', () => {
        const currentSnapshot = renderer.create(<Footer></Footer>).toJSON();

        expect(currentSnapshot).toMatchSnapshot();
    });
});
