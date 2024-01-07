import * as React from "react";
import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const StarIcon: React.FC<Props> = ({ color }) => (
  <Svg className="w-full h-full" viewBox="0 0 16 16" fill="none">
    <Path
      d="M2.90909 0L3.82545 2L5.81818 2.90909L3.82545 3.82545L2.90909 5.81818L2 3.82545L0 2.90909L2 2M10.1818 2.18182L12 6.18182L16 8L12 9.81818L10.1818 13.8182L8.36364 9.81818L4.36364 8L8.36364 6.18182M2.90909 10.1818L3.82545 12.1745L5.81818 13.0909L3.82545 14L2.90909 16L2 14L0 13.0909L2 12.1745"
      fill={color ? color : "#51FF8C"}
    />
  </Svg>
);
export default StarIcon;
