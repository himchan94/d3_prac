import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { scaleBand, scaleLinear, max, format } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 220,
};

const xAxisLabelOffset = 50;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const xValue = (d) => d.Population;
const yValue = (d) => d.Country;

const siFormat = format(".2s");
const xAxixTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxixTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Population
        </text>
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
