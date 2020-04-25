import React, { useEffect, useState } from 'react';
import './DailyCases.css';
import { FormattedMessage } from 'react-intl';
import Api from './Api';
import Utils from './Utils';
import ChartWrapper from './ChartWrapper';
import createLegends from './Legends.js'
export default function (props) {

  
  function getLabelsForChart (dailyCases) {
    let cases = dailyCases.timeline.cases;
    let recovered = dailyCases.timeline.recovered;
    let deaths = dailyCases.timeline.deaths;

    let labels = [];
    let totalCases = [];
    let recoveredCases = [];
    let deathCases = [];
    for (const property in cases) {
      labels.push(Utils.converToInidanFormat(property));
      totalCases.push(parseInt(cases[property]))
      recoveredCases.push(parseInt(recovered[property]))
      deathCases.push(parseInt(deaths[property]))
    }
    return {
      totalCases, recoveredCases, deathCases, labels
    }
  }
  function getHistoricalDataFromCountry (countryName) {
    fetch(Api.historicalData + countryName).then(
      (response) => response.json()
    ).then(data => {
      if (data.timeline) {
        let chartDatasets = getLabelsForChart(data);
        ChartWrapper.createCharts(chartDatasets);
      }
      ;
    })
  }

  let { countryNames } = props;
  countryNames = countryNames.sort();
  let [selectedCountryName, setSelectedCountryName] = useState('India');

  useEffect(() => {
    getHistoricalDataFromCountry(selectedCountryName);
  }, []);
  return (
    <div className=' col-sm-12'>
      <div className="form-group row">
        <label for="changeLange" className=" col-sm-6 ">
          <FormattedMessage id="ChangeCountry" />
        </label>
        <div className='col-sm-6'>
          <select className="form-control " id="changeLange" onChange={(e) => {
            setSelectedCountryName(e.target.value);
            getHistoricalDataFromCountry(e.target.value)
          }}>
            {countryNames.map(countryName => {
              let selected = false;
              if (selectedCountryName === countryName) {
                selected = true;
              }
              return <option value={countryName} selected={selected} >{countryName}</option>
            }
            )}
          </select>
        </div>
      </div>
      {createLegends()}
      <canvas id="myChart"></canvas>
      <div className='box col-sm-12'></div>
    </div>);
}
