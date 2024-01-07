import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const Minute30 = () => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
    <Circle cx={15} cy={15} r={14.5} stroke="#DD8500" strokeDasharray="2 2" />
    <Path
      d="M15 2C16.7072 2 18.3977 2.33625 19.9749 2.98957C21.5521 3.64288 22.9852 4.60045 24.1924 5.80761C25.3995 7.01477 26.3571 8.44788 27.0104 10.0251C27.6637 11.6023 28 13.2928 28 15C28 16.7072 27.6637 18.3977 27.0104 19.9749C26.3571 21.5521 25.3995 22.9852 24.1924 24.1924C22.9852 25.3995 21.5521 26.3571 19.9749 27.0104C18.3977 27.6637 16.7072 28 15 28L15 15V2Z"
      fill="#DD8500"
    />
  </Svg>
);
export default Minute30;
