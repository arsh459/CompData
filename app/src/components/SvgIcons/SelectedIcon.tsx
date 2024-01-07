import * as React from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
interface Props {
  color?: string;
}
const SelectedIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full aspect-square" viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={9} r={9} fill={color ? color : "#8B6EFF"} />
      <Rect
        x={4.77832}
        y={8.43848}
        width={4.87526}
        height={1.32958}
        rx={0.664788}
        transform="rotate(46.37 4.778 8.438)"
        fill="#fff"
      />
      <Path
        d="M6.76 12.447a.626.626 0 010-.885l5.65-5.65a.626.626 0 01.886.885l-5.65 5.65a.626.626 0 01-.886 0z"
        fill="#fff"
      />
    </Svg>
  );
};

export default SelectedIcon;
