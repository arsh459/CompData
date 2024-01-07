import Svg, { Circle, G } from "react-native-svg";

interface Props {
  radius: number;
  color: string;
  percent: number;
}
const ActivityRings: React.FC<Props> = ({ color, percent, radius }) => {
  return (
    <Svg className="w-full h-full -rotate-90" viewBox="0 0 37 37 ">
      <G>
        <Circle
          strokeWidth="3"
          r={radius}
          cx="50%"
          cy="50%"
          stroke={`${color}`}
          strokeOpacity={0.2}
        />
        <Circle
          strokeWidth="3"
          r={radius}
          cx="50%"
          cy="50%"
          stroke={color}
          strokeDasharray={`${percent},100`}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};
export default ActivityRings;
