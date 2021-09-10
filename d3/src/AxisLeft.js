export const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tickValue) => {
    return (
      <g className="tick">
        <text
          key={tickValue}
          x={-3}
          dy=".32em"
          style={{ textAnchor: "end" }}
          y={yScale(tickValue) + yScale.bandwidth() / 2}
        >
          {tickValue}
        </text>
      </g>
    );
  });
};
