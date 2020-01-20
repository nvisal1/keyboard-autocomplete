import React from 'react';
import renderer from 'react-test-renderer';

import Navbar, { NavbarProps } from './navbar';

describe('When the Navbar component is created', () => {
    it('should render correctly', () => {
        const requiredProps = getRequiredProps();
        const currentSnapshot = renderer.create(<Navbar { ...requiredProps }></Navbar>).toJSON();

        expect(currentSnapshot).toMatchSnapshot();
    });
});

function getRequiredProps(): NavbarProps {
   const handleClick = (_: string) => {}; 

   const selectedOption = 'test_option';

   const options = ['test_option'];

   return { handleClick, selectedOption, options };
}