import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
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
      <h3> Corona Cases, Recoveries and Deaths</h3>
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
        <th> Country</th>
        <th> Cases</th>
        <th> Recoveries</th>
        <th> Deaths</th>
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
        <td>Cases</td>
        <td>{allData.cases}</td>

      </tr>
      <tr>
        <td>Recovered</td>
        <td>{allData.recovered}</td>

      </tr>
      <tr>
        <td>Deaths</td>
        <td>{allData.deaths}</td>

      </tr>
      <tr>
        <td>Updated time</td>
        <td>{new Date(allData.updated).toLocaleString()}</td>

      </tr>
    </tbody>
  </table>
}

export default App;
