import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './DailyCases.css';
import { FormattedMessage } from 'react-intl';
import Utils from './Utils';
import Api from './Api';
function convertDataToArray (dailyCases) {
  let cases = dailyCases.timeline.cases;
  let recovered = dailyCases.timeline.recovered;
  let deaths = dailyCases.timeline.deaths;

  let dailyCasesArry = [];
  let i = 0;
  for (const property in cases) {
    if (parseInt(property[0]) > 2) {
      let indianformat = Utils.converToInidanFormat(property);
      dailyCasesArry.push({ item: i++, date: indianformat, data: parseInt(deaths[property]), className: 'deaths' });
      dailyCasesArry.push({ item: i++, date: indianformat, data: parseInt(recovered[property]), className: 'recovered' });
      dailyCasesArry.push({ item: i++, date: indianformat, data: parseInt(cases[property]), className: 'cases' });
    }

  }
  return dailyCasesArry;
}
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
function getHistoricalDataFromCountry (countryName) {
  fetch(Api.historicalData + countryName).then(
    (response) => response.json()
  ).then(data => {
    document.querySelector('.box').innerHTML = '';
    if(data.timeline){
      let dailyCasesArray = convertDataToArray(data);
      loadChart(dailyCasesArray);
    }
   ;
  })
}
export default function (props) {
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
          <FormattedMessage id="ChangeCountry"/>
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
      <div className='box col-sm-12'></div>
    </div>);
}

function loadChart (dailyCasesArray) {
  let boxWidth = document.querySelector(".box").offsetWidth;
  let margin = { top: 20, right: 20, bottom: 30, left: 50 }, width = boxWidth - margin.left - margin.right, height = 250 - margin.top - margin.bottom;
  let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  let y = d3.scaleLinear()
    .range([height, 0]);
  let svg = d3.select('.box').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  x.domain(dailyCasesArray.map(function (d) { return d.item; }));
  let maxDailyCases = d3.max(dailyCasesArray, function (d) { return d.data; });
  y.domain([0, maxDailyCases]);
  // append the rectangles for the bar chart
  svg.selectAll(".bar")
    .data(dailyCasesArray)
    .enter().append("rect")
    .attr("class", function (d) { return (d.className); })
    .attr("x", function (d) { return x(d.item); })
    .attr("width", x.bandwidth())
    .attr("y", function (d) { return y(d.data); })
    .attr("height", function (d) { return height - y(d.data); });
  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y).tickFormat(function (d) {
      if (maxDailyCases < 1e5) {
        return `${d}`;
      }
      let tick = Utils.convertToLakhs(d);
      return this.parentNode.nextSibling ? `\xa0${tick}` : `$${tick} lakhs`;
    }));
  svg.append("g").attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x.domain(dailyCasesArray.map(function (d) { return d.date; }))).tickValues([dailyCasesArray[0].date,
    dailyCasesArray[dailyCasesArray.length - 1].date]));
}
