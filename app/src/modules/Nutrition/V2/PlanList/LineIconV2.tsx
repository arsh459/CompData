import * as React from "react";
import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const LineIconV2: React.FC<Props> = ({ color }) => (
  <Svg className="w-full h-full" viewBox="0 0 91 3" fill="none">
    <Path
      d="M1 2C34.3173 -0.249958 81.4808 1.99994 91 1.99981"
      stroke={color ? color : "#02CD46"}
    />
  </Svg>
);
export default LineIconV2;
