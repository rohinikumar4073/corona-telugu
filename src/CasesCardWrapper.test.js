import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
import CasesCardWrapper from './CasesCardWrapper';
import CasesCard from './CasesCard';
import Loader from "./Loader";
import each from 'jest-each';
import mockData from './mocks/mockData'
Enzyme.configure({ adapter: new Adapter() });

test('Cases card wrapper tests', function () {
    const wrapper = shallow(
        <CasesCardWrapper allData={mockData.allData} indiaCases={mockData.indiaCases} andhraCases={mockData.andhraCases} telanganaCases={mockData.telanganaCases} />
    );
    expect(wrapper.find(CasesCard)).toHaveLength(5);

});

each([{}, { allData: {}, indiaCases: {} }]).
    test('Cases card test for loader for all zero', function (props) {
        const wrapper = shallow(
            <CasesCardWrapper {...props} />
        );
        expect(wrapper.find(CasesCard)).toHaveLength(0);
        expect(wrapper.find(Loader)).toHaveLength(1);

    });

let allData = { cases: 1234, recovered: 123, deaths: 12, tests: 123, critical: 123 };
let andhraCases = { cases: 1234, recovered: 123, deaths: 12, tests: 123, critical: 123 };
let telanganaCases = { cases: 1234, recovered: 123, deaths: 12, tests: 123, critical: 123 };
let indiaCases = { cases: 1234, recovered: 123, deaths: 12, tests: 123, critical: 123 };

let totalCases = [
    { "type": 'world', value: allData.cases },
    { "type": 'India', value: indiaCases.cases },
    { "type": 'Andhra Pradesh', value: andhraCases.total },
    { "type": 'Telangana', value: telanganaCases.total }
];
let criticalCases = [
    { "type": 'world', value: allData.critical, },
    { "type": 'India', value: indiaCases.critical },
    { "type": 'Andhra Pradesh', value: andhraCases.critical },
    { "type": 'Telangana', value: telanganaCases.critical }
];
let recoveredCases = [
    { "type": 'world', value: allData.recovered },
    { "type": 'India', value: indiaCases.recovered },
    { "type": 'Andhra Pradesh', value: andhraCases.recovered },
    { "type": 'Telangana', value: telanganaCases.recovered }
];
let deathChases = [
    { "type": 'world', value: allData.deaths },
    { "type": 'India', value: indiaCases.deaths },
    { "type": 'Andhra Pradesh', value: andhraCases.deaths },
    { "type": 'Telangana', value: telanganaCases.deaths }
];

let tests = [
    { "type": 'world', value: allData.tests },
    { "type": 'India', value: indiaCases.tests },
    { "type": 'Andhra Pradesh', value: andhraCases.tests },
    { "type": 'Telangana', value: telanganaCases.tests }
];
test('Data is passed correctly', function () {
    const wrapper = shallow(
        <CasesCardWrapper
            allData={allData}
            andhraCases={andhraCases}
            telanganaCases={telanganaCases}
            indiaCases={indiaCases} />
    );
    expect(wrapper.find(CasesCard).at(0).props().cardType).toBe('cases');
    expect(wrapper.find(CasesCard).at(1).props().cardType).toBe('recovered');
    expect(wrapper.find(CasesCard).at(2).props().cardType).toBe('deaths');
    expect(wrapper.find(CasesCard).at(3).props().cardType).toBe('tests');
    expect(wrapper.find(CasesCard).at(4).props().cardType).toBe('critical');
    expect(wrapper.find(CasesCard).at(0).props().cases).toStrictEqual(totalCases);
    expect(wrapper.find(CasesCard).at(1).props().cases).toStrictEqual(recoveredCases);
    expect(wrapper.find(CasesCard).at(2).props().cases).toStrictEqual(deathChases);
    expect(wrapper.find(CasesCard).at(3).props().cases).toStrictEqual(tests);
    expect(wrapper.find(CasesCard).at(4).props().cases).toStrictEqual(criticalCases);
});
