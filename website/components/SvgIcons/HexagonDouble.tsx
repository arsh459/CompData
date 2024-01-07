import React from "react";

interface HexagonProps {
  progress1: number;
  progress2: number;
  color1: string;
  color2: string;
  inactiveColor1: string;
  inactiveColor2: string;
}

const HexagonDouble: React.FC<HexagonProps> = ({
  progress1,
  progress2,
  color1,
  color2,
  inactiveColor1,
  inactiveColor2,
}) => {
  const hexagonSize = 60;
  const hexagonStrokeWidth = 8;
  const centerX = hexagonSize;
  const centerY = hexagonSize;
  const viewBox = `0 0 ${hexagonSize * 2} ${hexagonSize * 2}`;

  const calculateHexagonPoints = (
    centerX: number,
    centerY: number,
    size: number,
    rotation: number
  ): string => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + rotation;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  const outerHexagonRotation = Math.PI / 6;
  const innerHexagonRotation = Math.PI / 6;
  const innerHexagonSize = hexagonSize * 0.75;

  const active1 = Math.min(Math.max(progress1, 0), 1);
  const active2 = Math.min(Math.max(progress2, 0), 1);
  // console.log(active1, active2, "a1a2", progress1, progress2);

  const outerHexagonPoints = calculateHexagonPoints(
    centerX,
    centerY,
    hexagonSize,
    outerHexagonRotation
  );
  const innerHexagonPoints = calculateHexagonPoints(
    centerX,
    centerY,
    innerHexagonSize,
    innerHexagonRotation
  );

  return (
    <svg width="100%" height="100%" className="w-full h-full" viewBox={viewBox}>
      <polygon
        points={outerHexagonPoints}
        fill="none"
        stroke={inactiveColor1}
        strokeWidth={hexagonStrokeWidth}
      />
      <polygon
        points={outerHexagonPoints}
        fill="none"
        stroke={color1}
        strokeWidth={hexagonStrokeWidth}
        strokeDasharray={`${active1 * hexagonSize * Math.PI}, ${
          hexagonSize * Math.PI
        }`}
      />
      <polygon
        points={innerHexagonPoints}
        fill="none"
        stroke={inactiveColor2}
        strokeWidth={hexagonStrokeWidth}
      />
      <polygon
        points={innerHexagonPoints}
        fill="none"
        stroke={color2}
        strokeWidth={hexagonStrokeWidth}
        strokeDasharray={`${active2 * innerHexagonSize * Math.PI}, ${
          innerHexagonSize * Math.PI
        }`}
      />
    </svg>
  );
};

export default HexagonDouble;
