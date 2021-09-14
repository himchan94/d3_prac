export const Marks = ({
  binnedData,
  xScale,
  yScale,
  innerHeight,
  tooltipFormat,
}) =>
  binnedData.map((d, idx) => {
    // console.log(xScale(d.x1) - xScale(d.x0));
    return (
      <rect
        key={idx}
        className="mark"
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>
    );
  });
