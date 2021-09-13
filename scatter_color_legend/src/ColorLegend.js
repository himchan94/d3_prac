import { color } from "d3";

export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickTextOffset = 20,
  circleRadius = 7,
}) => {
  return colorScale.domain().map((domainValue, i) => {
    // console.log(domainValue);

    return (
      <g className="tick" transform={`translate(0, ${i * tickSpacing})`}>
        <circle fill={colorScale(domainValue)} r={circleRadius} />
        <text x={tickTextOffset} dy=".32em">
          {domainValue}
        </text>
      </g>
    );
  });
};
