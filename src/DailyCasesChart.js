import React, { useEffect } from 'react';
import * as d3 from "d3";
import './DailyCases.css'
function convertDataToArray (dailyCases) {
  let cases = dailyCases.timeline.cases;
  let recovered = dailyCases.timeline.recovered;
  let deaths = dailyCases.timeline.deaths;

  let dailyCasesArry = [];
  for (const property in cases) {
    if (parseInt(property[0]) > 2) {
      dailyCasesArry.push({ date: property + '3', data: parseInt(deaths[property]), className: 'deaths' });
      dailyCasesArry.push({ date: property + '2', data: parseInt(recovered[property]), className: 'recovered' });
      dailyCasesArry.push({ date: property + '1', data: parseInt(cases[property]), className: 'cases' });
    }

  }
  console.log('dailyCasesArry', dailyCasesArry);
  return dailyCasesArry;
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
    x.domain(dailCasesArray.map(function (d) { return d.date; }));
    y.domain([0, d3.max(dailCasesArray, function (d) { return d.data; })]);
    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(dailCasesArray)
      .enter().append("rect")
      .attr("class", function (d) { return (d.className); })
      .attr("x", function (d) { return x(d.date); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.data); })
      .attr("height", function (d) { return height - y(d.data); });


    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
  }, [dailyCases]);

  return <div className='box'></div>;
}