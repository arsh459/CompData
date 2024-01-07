import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const AddIcon = () => (
  <Svg className="w-full h-full" viewBox="0 0 22 22" fill="none">
    <Circle cx={11} cy={11} r={11} fill="#6D55D1" />
    <Path
      d="M11 15V11M11 11V7M11 11H15M11 11H7"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default AddIcon;
