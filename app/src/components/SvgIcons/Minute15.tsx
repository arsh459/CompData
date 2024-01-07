import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const Minute15 = () => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
    <Circle cx={15} cy={15} r={14.5} stroke="#CBDD00" strokeDasharray="2 2" />
    <Path
      d="M15 2C16.7072 2 18.3977 2.33625 19.9749 2.98957C21.5521 3.64288 22.9852 4.60045 24.1924 5.80761C25.3996 7.01477 26.3571 8.44788 27.0104 10.0251C27.6637 11.6023 28 13.2928 28 15L15 15V2Z"
      fill="#CBDD00"
    />
  </Svg>
);
export default Minute15;
