export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}) =>
  xScale.ticks().map((tickValue, idx) => (
    <g
      className="tick"
      key={idx}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text
        style={{ textAnchor: "middle" }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
