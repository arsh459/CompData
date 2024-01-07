import React from "react";
// import { Cell, Pie, PieChart } from "recharts";

interface Props {
  percent: number;
  circleSize: number;
  color?: {
    colorPrimary: string;
    colorSecondary: string;
  };
}

const CirclePercent: React.FC<Props> = ({
  children,
  circleSize,
  percent,
  color,
}) => {
  // const data = [
  //   { id: "1", name: "L1", value: percent },
  //   { id: "2", name: "L2", value: 100 - percent },
  // ];

  // const strokeWidth = 4;
  // const Radius = circleSize / 2 - strokeWidth / 2;
  // const circumference = 2 * Math.PI * Radius;
  // const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: circleSize, height: circleSize }}>
      {/* <PieChart width={circleSize} height={circleSize}>
        <defs>
          <linearGradient id="linearGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={color?.colorPrimary} />
            <stop offset="100%" stopColor={color?.colorSecondary} />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          dataKey="value"
          innerRadius="100%"
          outerRadius="105%"
          fill="transparent"
          cornerRadius={50}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          blendStroke
        >
          <Cell key="test" fill={color ? "url(#linearGradient)" : "#ffffff"} />
        </Pie>
      </PieChart> */}

      {/* <svg
                width="100%"
                height="100%"
                style={{ transform: "rotate(-90deg)" }}
            >
                <defs>
                    <linearGradient
                        id="linearGradient"
                        x1="0"
                        y1="1"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stopColor={color?.colorPrimary} />
                        <stop offset="100%" stopColor={color?.colorSecondary} />
                    </linearGradient>
                </defs>
                <circle
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={Radius}
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    stroke={color ? "url(#linearGradient)" : "#FFFFFF"}
                    strokeLinecap="round"
                    strokeDashoffset={offset}
                    strokeDasharray={`${circumference} ${circumference}`}
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        values={`${circumference};${offset}`}
                        dur="1s"
                    ></animate>
                </circle>
            </svg> */}

      <div className="absolute inset-0 grid place-items-center">
        {children ? children : percent}
      </div>
    </div>
  );
};

export default CirclePercent;
