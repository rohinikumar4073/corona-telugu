import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import './CaseDetails.css'
export default function CaseDetails (props) {
  const { cases } = props;
  const [searchCountry, setSearchCountry] = useState('');
  const [indianCases, setIndianCases] = useState(null);

  const [localCopyCases, setLocalCopyCases] = useState(null);

  useEffect(() => {
    setLocalCopyCases(cases);
    if (cases) {
      let filterCases = cases.filter(caseItem =>
        caseItem.country === 'India');
      setIndianCases(filterCases);
    }

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
            caseItem.Country.toLowerCase().includes(toLowerCaseValue));
          setLocalCopyCases(filterCases);
        }}></input>
      </div>
    </div>
    <div className='row'>
      {localCopyCases ? getCases(localCopyCases, indianCases) :<Loader></Loader>}
    </div>
  </>)

}
function getCases (cases, indiaCases) {
  return (
    <div className='col-sm-12 total-details-wrapper'>
      <table className='table '>
        <thead>
          <tr>
            <th> <FormattedMessage id="country" /></th>
            <th> <FormattedMessage id="cases" /></th>
            <th> <FormattedMessage id="NewCases" /></th>
            <th> <FormattedMessage id="recovered" /></th>
            <th> <FormattedMessage id="deaths" /></th>
          </tr>
        </thead>
        <tbody>
          {indiaCases.map(caseItem => getCaseDetails(caseItem))}
          {cases.map(caseItem => getCaseDetails(caseItem))}
        </tbody>
      </table>
    </div>
  )
}

function getCaseDetails (caseItem) {
  return (<tr key={caseItem.country}>
    <td><img src={caseItem.countryInfo.flag} width='30'></img> <FormattedMessage id={caseItem.country} /> </td>
    <td>{caseItem.cases}</td>
    <td>{caseItem.todayCases}</td>
    <td>{caseItem.recovered}</td>
    <td>{caseItem.deaths}</td>

  </tr >)
}
