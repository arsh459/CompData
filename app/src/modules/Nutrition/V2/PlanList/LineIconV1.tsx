import * as React from "react";
import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const LineIconV1: React.FC<Props> = ({ color }) => (
  <Svg className="h-full w-full" viewBox="0 0 127 5" fill="none">
    <Path
      d="M1 3C47.6442 0.750042 113.673 2.99994 127 2.99981"
      stroke={color ? color : "#02CD46"}
      strokeWidth={3}
    />
  </Svg>
);
export default LineIconV1;
