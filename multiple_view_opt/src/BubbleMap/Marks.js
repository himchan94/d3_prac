import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { useMemo } from "react";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => (
  <g className="marks">
    {useMemo(() => {
      console.log("rerendered");
      return (
        <>
          <path className="sphere" d={path({ type: "Sphere" })} />
          <path className="graticules" d={path(graticule())} />
          {land.features.map((feature, idx) => (
            <path className="land" d={path(feature)} key={idx} />
          ))}
          <path className="interiors" d={path(interiors)} />
        </>
      );
    }, [land, interiors])}

    {data.map((d, idx) => {
      const [x, y] = projection(d.coords);
      return <circle key={idx} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
    })}
  </g>
);
