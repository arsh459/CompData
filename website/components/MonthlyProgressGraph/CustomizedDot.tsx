import { baseImageKit, fPointsWhite } from "@constants/icons/iconURLs";
// import { getLevelIcon } from "@templates/community/UserProfile/utils";
import { monthlyGraphData } from "./useActivitesCurrentMonth";

interface Props {
  props: any;
  peak: monthlyGraphData;
  color: string;
  //   level: number;
}

const CustomizedDot: React.FC<Props> = ({ props, peak, color }) => {
  const { cx, cy, height, payload } = props;

  if (payload.points && payload === peak) {
    const dynamicWidth = payload.points.toString().length * 10 + 50;

    return (
      <svg width="100%" height="100%">
        <foreignObject
          className="node"
          x={cx - dynamicWidth / 2}
          y={cy - 40}
          width={dynamicWidth}
          height="40"
        >
          <div
            className="flex justify-center items-center text-white py-1 px-4 rounded-lg"
            style={{ backgroundColor: color }}
          >
            <img
              className="pr-2"
              src={`${baseImageKit}/tr:w-16,c-maintain_ratio/${fPointsWhite}`}
            />
            {payload.points}
          </div>
          <div
            className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] mx-auto"
            style={{ borderTopColor: color }}
          ></div>
          <div style={{ width: "1ch" }} />
        </foreignObject>
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={height}
          strokeWidth="1"
          stroke={color}
          strokeDasharray="12 6"
        ></line>
      </svg>
    );
  }

  return null;
};

export default CustomizedDot;
