import Languages from './Languages';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
Enzyme.configure({ adapter: new Adapter() });
test('Test for languages are set with correct state', function () {
    const wrapper = shallow(<Languages />);
    expect(wrapper.find('.form-check-input')).toHaveLength(2);
});

test('Test triggering handle changes', function () {
    const spy = jest.fn();

    const wrapper = shallow(<Languages handleLanguageChange={spy} />);
    wrapper.find('#inlineCheckbox2').simulate('change', { target: { value: 'en' } });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#inlineCheckbox2[checked="checked"]')).toHaveLength(1);
});