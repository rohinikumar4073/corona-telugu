import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormattedMessage } from 'react-intl';
function App (props) {
  const [allData, setAllData] = useState(null);
  const [page] = useState(1);
  const [indiaCases, setIndiaCases] = useState(null);

  const [cases, setCases] = useState(null);

  useEffect(() => {

    fetch('https://corona.lmao.ninja/all').then((res) => res.json()).then(data => {
      setAllData(data);
    })

    fetch('https://corona.lmao.ninja/countries?sort=cases').then((res) => res.json()).then(cases => {
      setCases(cases);
    });
    fetch('https://corona.lmao.ninja/countries/India').then((res) => res.json()).then(cases => {
      setIndiaCases(cases);
    });
  }, [page]);
  return (
    <div className="App container ">
      <h3> <FormattedMessage id="title" /></h3>
      <div className="form-group row">
        <label for="changeLange" className="col-sm-4 "><FormattedMessage id="changeLanguage" /></label>
        <div className="col-sm-8">

          <select className="form-control " id="changeLange" onChange={(e) => { props.changeLanguage(e.target.value) }}
          >
            <option value="te" selected>తెలుగు</option>
            <option value="en">English</option>

          </select>
        </div>
      </div>
      <div className='row'>
        {allData ? getAllData(allData) : 'Loading...'}
      </div>

      <div className='row'>
        {cases ? getCases(cases, indiaCases) : 'Loading...'}
      </div>
    </div>
  );
}
function getCases (cases, indiaCases) {
  return <table className='table '>
    <thead>

      <tr>
        <th> <FormattedMessage id="country" /></th>
        <th> <FormattedMessage id="cases" /></th>
        <th> <FormattedMessage id="recovered" /></th>
        <th> <FormattedMessage id="deaths" /></th>
      </tr>
    </thead>
    <tbody>
      {indiaCases ? getCaseDetails(indiaCases) : <tr><td>'Loading...'</td></tr>}
      {cases.map(caseItem => getCaseDetails(caseItem))}
    </tbody>
  </table>
}

function getCaseDetails (caseItem) {
  return (<tr key={caseItem.country}>
    <td>{caseItem.country}</td>
    <td>{caseItem.cases}</td>
    <td>{caseItem.recovered}</td>
    <td>{caseItem.deaths}</td>

  </tr >)
}
function getAllData (allData) {
  return <table className="table total-details">

    <tbody>
      <tr>
        <td><FormattedMessage id="cases" /></td>
        <td>{allData.cases}</td>

      </tr>
      <tr>
        <td><FormattedMessage id="recovered" /></td>
        <td>{allData.recovered}</td>

      </tr>
      <tr>
        <td><FormattedMessage id="deaths" /></td>
        <td>{allData.deaths}</td>

      </tr>
      <tr>
        <td><FormattedMessage id="updated" /></td>
        <td>{new Date(allData.updated).toLocaleString()}</td>

      </tr>
    </tbody>
  </table>
}

export default App;
