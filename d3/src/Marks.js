export const Marks = ({ data, xScale, yScale, xValue, yValue }) => {
  return data.map((d) => {
    return (
      <rect
        className="mark"
        key={d.Country}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      />
    );
  });
};
