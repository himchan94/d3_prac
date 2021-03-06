import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { scaleLinear, scaleTime, extent, timeFormat } from "d3";
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
  left: 90,
};

const xAxisLabel = "Time";
const yAxisLabel = "Temperature";

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const xValue = (d) => d.timestamp;
const yValue = (d) => d.temperature;

const xAxixTickFormat = (tickValue) => timeFormat("%a")(tickValue);

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxixTickFormat}
          tickOffset={7}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          circleRadius={6}
        />
      </g>
    </svg>
  );
}
export default App;
