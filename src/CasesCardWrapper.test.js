import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
import CasesCardWrapper from './CasesCardWrapper';
import CasesCard from './CasesCard';

Enzyme.configure({ adapter: new Adapter() });

test('Cases card wrapper tests', function () {
    const wrapper = shallow(
        <CasesCardWrapper allData={{}} indiaCases={{}} andhraCases={{}} telanganaCases={{}} />
    );
    expect(wrapper.find(CasesCard)).toHaveLength(5);



});