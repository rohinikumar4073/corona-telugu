import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css';
import Utils from './Utils';
import { FormattedMessage } from 'react-intl';
import CaseDetails from './CaseDetails';
import Loader from './Loader';
import DailyCasesChart from './DailyCasesChart'
import Api from './Api'
import StateCaseDetails from './StateCaseDetails'
function App (props) {

  const [allData, setAllData] = useState(null);
  const [page] = useState(1);
  const [cases, setCases] = useState(null);
  const [countryNames, setCountries] = useState(null);
  const [indianStatesCases, setIndianStateCases] = useState(null);


  useEffect(() => {
    fetch(Api.getWorldCoronaCases).then((res) => res.json()).then(data => {
      setAllData(data);
    })
    fetch(Api.getAllCountriesCoranaCases).then((res) => res.json()).then(
      cases => {
        setCases(cases);
        setCountries(cases.map(caseItem => caseItem.country));
      });
    fetch(Api.getInidanStateCases).then((res) => res.json()).then(
      cases => {
        setIndianStateCases(cases.states);
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
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          {allData ? getAllData(allData) : <Loader />}
        </div>
        <div className='col-sm-12 col-md-6'>
          {countryNames ? <DailyCasesChart countryNames={countryNames} /> : <Loader />}
        </div>
      </div>

      <StateCaseDetails cases={indianStatesCases} setCases={setIndianStateCases} ></StateCaseDetails>

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
        <td><FormattedMessage id="critical" /></td>
        <td>{Utils.convertToIndianMetrics(allData.critical)}</td>
      </tr>

      <tr>
        <td><FormattedMessage id="tests" /></td>
        <td>{Utils.convertToIndianMetrics(allData.tests)}</td>
      </tr>
      <tr>
        <td><FormattedMessage id="testsPer10lakhs" /></td>
        <td>{Utils.convertToIndianMetrics(allData.testsPerOneMillion)}</td>
      </tr>
      <tr>
        <td><FormattedMessage id="activePer10lakhs" /></td>
        <td>{Utils.convertToIndianMetrics(allData.activePerOneMillion)}</td>
      </tr>
      <tr>
        <td><FormattedMessage id="recoveredPer10lakhs" /></td>
        <td>{Utils.convertToIndianMetrics(allData.recoveredPerOneMillion)}</td>
      </tr>
      <tr>
        <td><FormattedMessage id="population" /></td>
        <td>{Utils.convertToIndianMetrics(allData.population)}</td>
      </tr>
    </tbody>
  </table>
}

export default App;
