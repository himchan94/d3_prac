import React, { useState } from "react";

import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";

import { BubbleMap } from "./BubbleMap/index.js";
import { DateHistogram } from "./DateHistogram/index.js";

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  const [brushExtent, setBrushExtent] = useState();

  const xValue = (d) => d["Reported Date"];

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <BubbleMap data={filteredData} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={data}
          width={width}
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
  );
};

export default App;
