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
      {allData ?
        <div className='row'>
          <div className='col-sm-12 col-md-4 all-cases-card'>
            {getAllData(allData, 'cases')}
          </div>
          <div className='col-sm-12 col-md-4 critical-card'>
            {getAllData(allData, 'critical')}
          </div>
          <div className='col-sm-12 col-md-4 recovered-cases-card'>
            {getAllData(allData, 'recovered')}
          </div>
          <div className='col-sm-12 col-md-4 deaths-card'>
            {getAllData(allData, 'deaths')}
          </div>
          <div className='col-sm-12 col-md-4 tests-card'>
            {getAllData(allData, 'tests')}
          </div>
        </div> : <Loader />}
      <h3> <FormattedMessage id="Every Day Cases per country" /></h3>


      <div className='row'>
        <div className='col-sm-12'>
          {countryNames ? <DailyCasesChart countryNames={countryNames} /> : <Loader />}
        </div>
      </div>
      <h3> <FormattedMessage id="Cases per state" /></h3>

      <StateCaseDetails cases={indianStatesCases} setCases={setIndianStateCases} ></StateCaseDetails>

      <h3> <FormattedMessage id="Cases per country" /></h3>
      <CaseDetails cases={cases} setCases={setCases} ></CaseDetails>

    </div>
  );
}


function getAllData (allData, type) {
  return <table className="table total-details">
    <thead>
      <tr>
        <td colSpan="2" ><FormattedMessage id={type} /></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><FormattedMessage id="world" /></td>
        <td>{Utils.convertToIndianMetrics(allData[type])}</td>

      </tr>

    </tbody>
  </table>
}

export default App;
