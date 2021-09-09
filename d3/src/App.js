import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { scaleBand, scaleLinear, max } from "d3";

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

function App() {
  const csvUrl =
    "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };

    d3.csv(csvUrl, row).then((data) => console.log(data));
    d3.csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map((tickValue) => {
          return (
            <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
              <line y2={innerHeight} stroke="black" />
              <text
                style={{ textAnchor: "middle" }}
                y={innerHeight + 3}
                dy=".71em"
              >
                {tickValue}
              </text>
            </g>
          );
        })}
        {yScale.domain().map((tickValue) => {
          return (
            <text
              key={tickValue}
              x={-3}
              dy=".32em"
              style={{ textAnchor: "end" }}
              y={yScale(tickValue) + yScale.bandwidth() / 2}
            >
              {tickValue}
            </text>
          );
        })}
        {data.map((d) => {
          return (
            <rect
              key={d.Country}
              x={0}
              y={yScale(d.Country)}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
          );
        })}
      </g>
    </svg>
  );
}
export default App;

// return (
//   <svg width={width} height={height}>
//     <g transform={`translate(${centerX}, ${centerY})`}>
//       {data.map((d, idx) => (
//         <path
//           fill={d["RGB hex value"]}
//           d={pieArc({
//             startAngle: (idx / data.length) * 2 * Math.PI,
//             endAngle: ((idx + 1) / data.length) * 2 * Math.PI,
//           })}
//         />
//       ))}
//     </g>
//   </svg>
// );
