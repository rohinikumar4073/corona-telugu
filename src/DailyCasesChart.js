import React, { useEffect, useState } from 'react';
import './DailyCases.css';
import { FormattedMessage } from 'react-intl';
import Api from './Api';
import Utils from './Utils';
import Chart from 'chart.js/dist/Chart.js';

export default function (props) {
  function createLegends () {
    return <div className='bar-chart-legend col-sm-12'>
      <div className='legend-wrapper'>
        <span><FormattedMessage id="cases" /></span>
        <span className="cases-legend legend"></span>
      </div>
      <div className='legend-wrapper'>
        <span><FormattedMessage id="recovered" /></span>
        <span className="cases-recovered legend"></span>
      </div>
      <div className='legend-wrapper'>
        <span><FormattedMessage id="deaths" /></span>
        <span className="cases-deaths legend"></span>
      </div>

    </div>
  }
  function createCharts ({ totalCases, recoveredCases, deathCases, labels }) {
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: labels,
        datasets: [{
          label: 'Deaths',
          data: deathCases,
          borderColor: 'red',
          backgroundColor: 'red',
          cubicInterpolationMode: 'monotone'
        }, {
          label: 'Recovered cases',
          data: recoveredCases,
          borderColor: 'greenyellow',
          backgroundColor: 'greenyellow',
          cubicInterpolationMode: 'monotone'
        }, {
          label: 'All corona cases',
          data: totalCases,
          borderColor: 'steelblue',
          backgroundColor: 'steelblue',
          cubicInterpolationMode: 'monotone'
        }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: "#CCC", // this here
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: "#CCC", // this here
            }
          }]
        }
      }

    });
  }
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
      document.querySelector('.box').innerHTML = '';
      if (data.timeline) {
        let chartDatasets = getLabelsForChart(data);
        createCharts(chartDatasets);
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
