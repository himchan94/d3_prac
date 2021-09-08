import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { message } from "./message";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

function App() {
  const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

  const [data, setData] = useState(null);

  const pieArc = d3.arc().innerRadius(0).outerRadius(width);
  const colorPie = d3.pie().value(1);

  useEffect(() => {
    d3.csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map((d, idx) => (
          <path fill={d.data["RGB hex value"]} d={pieArc(d)} />
        ))}
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
