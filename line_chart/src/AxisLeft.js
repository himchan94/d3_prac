export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => {
  return yScale.ticks().map((tickValue) => {
    console.log(yScale(tickValue));
    return (
      <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
        <line x2={innerWidth} />
        <text
          key={tickValue}
          x={-tickOffset}
          dy=".32em"
          style={{ textAnchor: "end" }}
        >
          {tickValue}
        </text>
      </g>
    );
  });
};
