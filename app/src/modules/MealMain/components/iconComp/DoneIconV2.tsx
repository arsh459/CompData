import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const DoneIconV2 = () => (
  <Svg className="w-full h-full" viewBox="0 0 22 22" fill="none">
    <Circle cx={11} cy={11} r={11} fill="#2BE069" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.21428 15.1594C8.22947 15.1777 8.24564 15.1955 8.26279 15.2127C8.56168 15.5115 9.04627 15.5115 9.34516 15.2127L16.2513 8.30653C16.5502 8.00765 16.5502 7.52305 16.2513 7.22417C15.9524 6.92528 15.4678 6.92528 15.1689 7.22417L8.8851 13.508L6.40064 10.9017C6.09101 10.5769 5.5767 10.5646 5.25189 10.8742C4.92708 11.1838 4.91478 11.6981 5.2244 12.0229L8.21428 15.1594Z"
      fill="#232136"
    />
  </Svg>
);
export default DoneIconV2;
