import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import React from 'react';
import CasesCard from './CasesCard';
Enzyme.configure({ adapter: new Adapter() });
import { IntlProvider } from 'react-intl';

import teluguMessages from './translations/te.json';

let locale = 'te';
let messages = teluguMessages;
test('Test for four elements present in the card', function () {
    let cases = [{
        type: 'world',
        value: 1234
    }, {
        type: 'world',
        value: 1234
    }, {
        type: 'world',
        value: 1234
    }, {
        type: 'world',
        value: 1234
    }]
    const wrapper = mount(<IntlProvider locale={locale} messages={messages}>
        <CasesCard cases={cases} cardType="total" />
    </IntlProvider>);
    expect(wrapper.find('.caseitem-row')).toHaveLength(4);
});
test('Test for value empty in the cards not returining any rows', function () {
    let cases = [{
        type: 'world',
        value: 1234
    }, {
        type: 'india',
        value: 1234
    }, {
        type: 'andhra'
    }, {
        type: 'teleanaga'
    }]
    const wrapper = mount(<IntlProvider locale={locale} messages={messages}>
        <CasesCard cases={cases} cardType="total" />
    </IntlProvider>);
    expect(wrapper.find('.caseitem-row')).toHaveLength(2);
});