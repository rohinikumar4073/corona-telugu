import React, { useEffect } from 'react';
import * as d3 from "d3";
import './DailyCases.css';
import { FormattedMessage } from 'react-intl';
import Utils from './Utils';

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
export default function (props) {
  let { dailyCases } = props;
  let dailCasesArray = convertDataToArray(dailyCases);


  useEffect(() => {
    let boxWidth = document.querySelector(".box").offsetWidth;

    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = boxWidth - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    var y = d3.scaleLinear()
      .range([height, 0]);
    var svg = d3.select('.box').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    x.domain(dailCasesArray.map(function (d) { return d.item; }));
    y.domain([0, d3.max(dailCasesArray, function (d) { return d.data; })]);
    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(dailCasesArray)
      .enter().append("rect")
      .attr("class", function (d) { return (d.className); })
      .attr("x", function (d) { return x(d.item); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.data); })
      .attr("height", function (d) { return height - y(d.data); });

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x.domain(dailCasesArray.map(function (d) { return d.date; }))).tickValues(
        [dailCasesArray[0].date,
        dailCasesArray[dailCasesArray.length - 1].date]));
  }, [dailyCases]);

  return (
    <div className=' col-sm-12'>
      {createLegends()}
      <div className='box col-sm-12'></div>
    </div>);
}