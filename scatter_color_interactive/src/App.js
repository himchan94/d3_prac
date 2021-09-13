import React, { useState, useCallback, useEffect } from "react";
import { scaleLinear, max, format, extent, scaleOrdinal } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";

const width = 960;
const height = 500;
const margin = { top: 20, right: 200, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);
  console.log(hoveredValue);
  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = "Petal Length";

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  const colorValue = (d) => d.species;
  const colorLegendLabel = "Species";

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  // console.log(colorScale.domain()); //  ['setosa', 'versicolor', 'virginica']
  // console.log(colorScale.range());
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
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
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <g transform={`translate(${innerWidth + 50},${innerHeight / 7})`}>
          <text className="axis-label" textAnchor="middle" x={35} y={-25}>
            {colorLegendLabel}
          </text>
          <ColorLegend
            hoveredValue={hoveredValue}
            colorScale={colorScale}
            onHover={setHoveredValue}
          />
        </g>
        <g opacity={hoveredValue ? 0.2 : 1}>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          xValue={xValue}
          yValue={yValue}
          colorValue={colorValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={7}
        />
      </g>
    </svg>
  );
};

export default App;
