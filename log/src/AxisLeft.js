export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map((tickValue, idx) => (
    <g
      className="tick"
      transform={`translate(0,${yScale(tickValue)})`}
      key={idx}
    >
      <line x2={innerWidth} />
      {yScale.tickFormat()(tickValue) ? (
        <text style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
          {tickValue}
        </text>
      ) : null}
    </g>
  ));
