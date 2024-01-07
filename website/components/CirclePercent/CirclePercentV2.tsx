interface Props {
  percent: number;
  circleSize: number;
  strokeWidthNum?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const CirclePercentV2: React.FC<Props> = ({
  children,
  percent,
  circleSize,
  strokeWidthNum,
  activeColor,
  inactiveColor,
}) => {
  const remotePercent = percent < 0 ? 0 : percent > 1 ? 1 : percent;
  const strokeWidth = strokeWidthNum ? strokeWidthNum : 4;
  const Radius = circleSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * Radius;
  const offset = circumference - remotePercent * circumference;

  return (
    <div className="relative" style={{ width: circleSize, height: circleSize }}>
      <svg width="100%" height="100%" style={{ transform: "rotate(-90deg)" }}>
        <circle // InActive Circle
          strokeWidth={strokeWidth}
          fill="transparent"
          r={Radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
          stroke={inactiveColor ? inactiveColor : "#00000033"}
          strokeLinecap="round"
        />
        <circle // Active Circle
          strokeWidth={strokeWidth}
          fill="transparent"
          r={Radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
          stroke={activeColor ? activeColor : "#000000"}
          strokeLinecap={remotePercent === 0 ? undefined : "round"}
          strokeDasharray={`${circumference - offset} ${offset}`}
        />
      </svg>

      {children ? (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ color: activeColor ? activeColor : "#000000" }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default CirclePercentV2;
