import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import App from './App';
import Api from './Api';
Enzyme.configure({ adapter: new Adapter() });
import { IntlProvider } from 'react-intl';
const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
});
test('fetch  calls', function () {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
    let app = mount(<IntlProvider><App /></IntlProvider>);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenNthCalledWith(1, Api.getWorldCoronaCases,)
    expect(global.fetch).toHaveBeenNthCalledWith(2, Api.getAllCountriesCoranaCases)
    expect(global.fetch).toHaveBeenNthCalledWith(3, Api.getInidanStateCases)

});
