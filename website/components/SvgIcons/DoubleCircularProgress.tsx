import React from "react";

interface DoubleCircularProgressProps {
  progress1: number;
  progress2: number;
  color1: string;
  color2: string;
  inactiveColor1: string;
  inactiveColor2: string;
  textValue: number;
}

const DoubleCircularProgress: React.FC<DoubleCircularProgressProps> = ({
  progress1,
  progress2,
  color1,
  color2,
  inactiveColor1,
  inactiveColor2,
  textValue,
}) => {
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;

  const strokeWidth = viewBoxSize * 0.05;
  const outerRadius = viewBoxSize * 0.4;
  const innerRadius = outerRadius - strokeWidth * 2; // Adjust inner radius

  const active1 = Math.min(Math.max(progress1, 0), 1);
  const active2 = Math.min(Math.max(progress2, 0), 1);

  const circumference = 2 * Math.PI * outerRadius;

  const dashOffset1 = circumference * (1 - active1);
  const dashOffset2 = circumference * (1 - active2);

  return (
    <svg
      width="100%"
      height="100%"
      className="w-full h-full"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
    >
      {/* Inactive outer circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius}
        fill="none"
        stroke={inactiveColor1}
        strokeWidth={strokeWidth}
      />
      {/* Active outer circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius}
        fill="none"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset1}
      />
      {/* Inactive inner circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        fill="none"
        stroke={inactiveColor2}
        strokeWidth={strokeWidth}
      />
      {/* Active inner circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        fill="none"
        stroke={color2}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset2}
      />
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={viewBoxSize * 0.3}
      >
        {textValue}
      </text>
    </svg>
  );
};

export default DoubleCircularProgress;
