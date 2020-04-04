import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css';
import Utils from './Utils';
import { FormattedMessage } from 'react-intl';
import CaseDetails from './CaseDetails';
import Loader from './Loader';
import DailyCasesChart from './DailyCasesChart'

function App (props) {

  const [allData, setAllData] = useState(null);
  const [page] = useState(1);
  const [cases, setCases] = useState(null);
  const [countryNames, setCountries] = useState(null);


  useEffect(() => {
    fetch('https://corona.lmao.ninja/all').then((res) => res.json()).then(data => {
      setAllData(data);
    })
    fetch('https://corona.lmao.ninja/countries?sort=cases').then((res) => res.json()).then(
      cases => {
      setCases(cases);
      setCountries(cases.map(caseItem => caseItem.country));
    });
  }, [page]);
  return (
    <div className="App container ">
      <h3> <FormattedMessage id="title" /></h3>
      <div className="form-group row">
        <label for="changeLange" className=" col-sm-6 ">
          <FormattedMessage id="changeLanguage" />
        </label>
        <div className='col-sm-6'>
          <select className="form-control " id="changeLange" onChange={(e) => { props.changeLanguage(e.target.value) }}>
            <option value="te" selected>తెలుగు</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <div className='row'>
        {allData ? getAllData(allData) : <Loader />}
      </div>
      <div className='row'>
        <h4 className='col-sm-12'> <FormattedMessage id="CasesInIndia" /></h4>
        {countryNames ? <DailyCasesChart countryNames={countryNames} /> : <Loader />}
      </div>
      <CaseDetails cases={cases} setCases={setCases} ></CaseDetails>

    </div>
  );
}


function getAllData (allData) {
  return <table className="table total-details">

    <tbody>
      <tr>
        <td><FormattedMessage id="cases" /></td>
        <td>{Utils.convertToIndianMetrics(allData.cases)}</td>

      </tr>
      <tr>
        <td><FormattedMessage id="recovered" /></td>
        <td>{Utils.convertToIndianMetrics(allData.recovered)}</td>

      </tr>
      <tr>
        <td><FormattedMessage id="deaths" /></td>
        <td>{Utils.convertToIndianMetrics(allData.deaths)}</td>
      </tr>
      <tr>
        <td><FormattedMessage id="updated" /></td>
        <td>{new Date(allData.updated).toLocaleString()}</td>
      </tr>
    </tbody>
  </table>
}

export default App;
