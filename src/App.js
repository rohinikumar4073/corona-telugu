import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css';
import { FormattedMessage } from 'react-intl';
import CaseDetails from './CaseDetails';
import Loader from './Loader';
import DailyCasesChart from './DailyCasesChart'
import Api from './Api'
import StateCaseDetails from './StateCaseDetails'
import Languages from './Languages';
import CasesCardWrapper from "./CasesCardWrapper";
function App (props) {

  const [allData, setAllData] = useState(null);
  const [page] = useState(1);
  const [cases, setCases] = useState(null);
  let [indiaCases, setIndiaCases] = useState(null);
  const [countryNames, setCountries] = useState(null);
  const [indianStatesCases, setIndianStateCases] = useState(null);
  const [andhraCases, setAndhraCases] = useState(null);
  const [telangangaCases, setTelanagaCases] = useState(null);

  useEffect(() => {
    fetch(Api.getWorldCoronaCases).then((res) => res.json()).then(data => {
      setAllData(data);
    })
    fetch(Api.getAllCountriesCoranaCases).then((res) => res.json()).then(
      cases => {
        setCases(cases);
        setCountries(cases.map(caseItem => caseItem.country));
        let indianCases = cases.filter(caseItem => caseItem.country.toLowerCase() === 'india')
        setIndiaCases(indianCases[0]);
      });
    fetch(Api.getInidanStateCases).then((res) => res.json()).then(
      cases => {
        setIndianStateCases(cases.states);
        let filterCases = cases.states.filter(caseItem => {
          return caseItem.state === 'Andhra Pradesh' || caseItem.state === 'Telangana'
        });
        setAndhraCases(filterCases[0]);
        setTelanagaCases(filterCases[1]);
      });
  }, [page]);

  return (
    <div className="App container ">
      <h3>
        <FormattedMessage id="title" />
      </h3>
      <div className="form-group row">
        <label for="changeLange" className="col-6 ">
          <FormattedMessage id="changeLanguage" />
        </label>
        <div className='col-6 languages-container'>
          <Languages handleLanguageChange={(value) => { props.changeLanguage(value) }} />
        </div>
      </div>
      <CasesCardWrapper allData={allData} indiaCases={indiaCases} andhraCases={andhraCases} telanganaCases={telangangaCases}></CasesCardWrapper>

      <h3> <FormattedMessage id="Every Day Cases per country" /></h3>
      <div className='row'>
        <div className='col-sm-12'>
          {countryNames ? <DailyCasesChart countryNames={countryNames} /> : <Loader />}
        </div>
      </div>
      <h3> <FormattedMessage id="Cases per state" /></h3>

      <StateCaseDetails cases={indianStatesCases} setCases={setIndianStateCases} ></StateCaseDetails>

      <h3>
        <FormattedMessage id="Cases per country" />
      </h3>
      <CaseDetails cases={cases} setCases={setCases} ></CaseDetails>

    </div>
  );
}




export default App;
