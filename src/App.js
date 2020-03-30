import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css';

import { FormattedMessage } from 'react-intl';
import CaseDetails from './CaseDetails';
import Loader from './Loader';
import DailyCasesChart from './DailyCasesChart'

function App (props) {

  const [allData, setAllData] = useState(null);
  const [page] = useState(1);
  const [cases, setCases] = useState(null);
  const [dailyCases, setDailyCases] = useState(null);


  useEffect(() => {

    fetch('https://covid19-server.chrismichael.now.sh/api/v1/AllReports').then((res) => res.json()).then(data => {
      setAllData(data.reports[0]);
      setCases(data.reports[0].table[0]);
    })
    fetch('https://corona.lmao.ninja/v2/historical/India').then((res) => res.json()).then(data => {
      console.log(data);
      setDailyCases(data);
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
      <h4> <FormattedMessage id="CasesInIndia" /></h4>
        {dailyCases ? <DailyCasesChart dailyCases={dailyCases} /> : <Loader />}
      </div>
      
      <CaseDetails cases={cases} setCases={setCases} ></CaseDetails>
      <div className='row'>
        {allData ? getAllData(allData) : <Loader />}
      </div>
    </div>
  );
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

    </tbody>
  </table>
}

export default App;
