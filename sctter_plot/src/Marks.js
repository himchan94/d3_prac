export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius = 5,
}) => {
  return data.map((d, idx) => {
    return (
      <circle
        key={idx}
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      />
    );
  });
};
