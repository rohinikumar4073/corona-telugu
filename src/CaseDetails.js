import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import './CaseDetails.css';
import Utils from './Utils';

export default function CaseDetails (props) {
  const { cases } = props;
  const [searchCountry, setSearchCountry] = useState('');
  const [localCopyCases, setLocalCopyCases] = useState(null);

 
  useEffect(() => {
    setLocalCopyCases(cases);
  }, [cases]);

  return (<>
    <div className="form-group row">
      <label for="changeLange " className='col-sm-6 ' >
        <FormattedMessage id="FilterByCountry" />
      </label>
      <div className='col-sm-6'>
        <input className="form-control" value={searchCountry} onChange={(e) => {
          setSearchCountry(e.target.value);
          let toLowerCaseValue = e.target.value.toLowerCase();
          let filterCases = cases.filter(caseItem =>
            caseItem.country.toLowerCase().includes(toLowerCaseValue));
          setLocalCopyCases(filterCases);
        }}></input>
      </div>
    </div>
    <div className='row'>
      {localCopyCases ? getCases(localCopyCases) :<Loader></Loader>}
    </div>
  </>)

}
function getCases (cases) {
  return (
    <div className='col-sm-12 total-details-wrapper'>
      <table className='table '>
        <thead>
          <tr>
            <th> <FormattedMessage id="country" /></th>
            <th> <FormattedMessage id="cases" /></th>
            <th> <FormattedMessage id="recovered" /></th>
            <th> <FormattedMessage id="deaths" /></th>
            <th> <FormattedMessage id="critical" /></th>
            <th> <FormattedMessage id="tests" /></th>
            <th> <FormattedMessage id="testsPer10lakhs" /></th>
          </tr>
        </thead>
        <tbody>
          {cases.map(caseItem => getCaseDetails(caseItem))}
        </tbody>
      </table>
    </div>
  )
}

function getCaseDetails (caseItem) {
  return (<tr key={caseItem.country}>
    <td><img src={caseItem.countryInfo.flag} width='30'></img> <FormattedMessage id={caseItem.country} /> </td>
    <td>{Utils.convertToIndianMetrics(caseItem.cases)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.recovered)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.deaths)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.critical)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.tests)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.testsPerOneMillion)}</td>


  </tr >)
}
