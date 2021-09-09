import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { scaleBand, scaleLinear, max } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 200,
};

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const xValue = (d) => d.Population;
const yValue = (d) => d.Country;

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
}
export default App;
