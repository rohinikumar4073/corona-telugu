import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import './CaseDetails.css';
import Utils from './Utils';

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

  return (
    <div className='row'>
      {localCopyCases ? getCases(localCopyCases, indianCases) :<Loader></Loader>}
    </div>
  )

}
function getCases (cases, indiaCases) {
  return (
    <div className='col-sm-12 total-details-wrapper'>
      <table className='table '>
        <thead>
          <tr>
            <th> <FormattedMessage id="state" /></th>
            <th> <FormattedMessage id="cases" /></th>
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
  return (<tr key={caseItem.state}>
    <td>{caseItem.state}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.cases)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.recovered)}</td>
    <td>{Utils.convertToIndianMetrics(caseItem.deaths)}</td>


  </tr >)
}
