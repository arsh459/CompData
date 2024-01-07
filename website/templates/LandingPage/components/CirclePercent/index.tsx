import React from "react";

interface Props {
  percent: number;
  circleSize: number;
  color: string;
}

const CirclePercent: React.FC<Props> = ({
  children,
  circleSize,
  percent,
  color,
}) => {
  const strokeWidth = 8;
  const Radius = circleSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * Radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: circleSize, height: circleSize }}>
      <svg width="100%" height="100%" style={{ transform: "rotate(-90deg" }}>
        <circle
          strokeWidth={strokeWidth}
          fill="transparent"
          r={Radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
          stroke={color ? color : "#FFFFFF"}
          strokeLinecap="round"
          strokeDashoffset={offset}
          strokeDasharray={`${circumference} ${circumference}`}
        />
      </svg>

      <div
        className="absolute grid place-items-center"
        style={{ inset: strokeWidth * 2 }}
      >
        {children ? children : null}
      </div>
    </div>
  );
};

export default CirclePercent;
