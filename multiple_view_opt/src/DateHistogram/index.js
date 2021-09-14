import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  brushX,
  select,
} from "d3";
import { useRef, useEffect } from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useMemo } from "react";
import _ from "lodash";

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%m/%d/%Y");

const xAxisLabel = "Time";
const yAxisLabel = "Total Dead and Missing";
const yValue = (d) => d["Total Dead and Missing"];

export const DateHistogram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
}) => {
  const brushRef = useRef();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(() => {
    // console.log("computing xScale");
    return scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  }, [data, xValue, innerWidth]);

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    // console.log("computing xScale");
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  }, [xValue, xScale, data]);

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, max(binnedData, (d) => d.y)])
      .range([innerHeight, 0]);
  }, [binnedData, innerHeight]);

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush", (e) => {
      // console.log(e.selection[0]);
      // console.log(xScale.invert(e.selection[0]));
      // cons0ole.log(e.selection.map(xScale.invert));
      console.log("디바운스");
      setBrushExtent(e.selection && e.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight]);

  return (
    <>
      <rect width={width} height={height} fill={"white"} />
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
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  );
};
