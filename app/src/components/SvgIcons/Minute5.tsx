import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const Minute5 = () => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
    <Path
      d="M15 2C16.7663 2 18.5141 2.35994 20.1366 3.05785L15 15V2Z"
      fill="#00DD4B"
    />
    <Circle cx={15} cy={15} r={14.5} stroke="#00DD4B" strokeDasharray="2 2" />
  </Svg>
);
export default Minute5;
