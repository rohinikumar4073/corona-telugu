import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

function convertDataToArray (dailyCases) {
  let cases = dailyCases.timeline.cases;
  let dailyCasesArry = [];
  for (const property in cases) {
    dailyCasesArry.push({ date: property.replace('/20', ''), data: parseInt(cases[property]) });
  }
  return dailyCasesArry.filter(dailyCasesData => dailyCasesData.data > 5);
}

export default function (props) {
  let { dailyCases } = props;
  let dailCasesArray = convertDataToArray(dailyCases);


  useEffect(() => {
    let boxWidth = document.querySelector(".box").offsetWidth;
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
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
      .attr("class", "bar")
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