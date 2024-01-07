import Svg, { Circle, Path, Rect } from "react-native-svg";

interface Props {
  color?: string;
}

const TaskIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 35 29" fill="none">
      <Circle cx={7.83} cy={6.83} r={1.83} fill={color ? color : "#FFF"} />
      <Path
        d="M11.967 7.274c-1.662-.358-2.077.595-2.077 1.116a3.426 3.426 0 00.115 1.451l.808 2.456c-.461.484-1.454 1.54-1.73 1.898-.277.357-.116.67 0 .781.038.037.161.134.346.224.184.089.538.037.692 0l2.423-2.345c.346-.781 0-1.116 0-1.563 0-.446.307-.409.461-.335 3.154 1.34 9.784 4.064 11.076 4.243 1.292.178 1-.67.692-1.117-1.73-.967-5.284-2.947-5.653-3.126-.462-.223-.28-.928-.692-1.228-.923-.67-4.384-2.009-6.461-2.455zM6 15.98h20.5v.732H6z"
        fill={color ? color : "#FFF"}
      />
      <Rect
        x={0.5}
        y={0.5}
        width={29}
        height={23}
        rx={2.5}
        stroke={color ? color : "#FFF"}
      />
      <Path
        d="M3 26h25.068C29.378 26 32 25 32 21V3"
        stroke={color ? color : "#FFF"}
      />
      <Path
        d="M4 28h25.932C31.288 28 34 27 34 23V5"
        stroke={color ? color : "#FFF"}
        strokeWidth={0.5}
      />
    </Svg>
  );
};

export default TaskIcon;
