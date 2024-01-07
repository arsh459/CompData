import * as React from "react";
import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const BackIconSmall: React.FC<Props> = ({ color }) => (
  <Svg width={5} height={11} viewBox="0 0 5 11" fill="none">
    <Path
      d="M4.00922 10.7823L0.126728 5.90633C0.080645 5.84828 0.0480798 5.7854 0.0290321 5.71768C0.0096773 5.64996 0 5.5774 0 5.5C0 5.4226 0.0096773 5.35004 0.0290321 5.28232C0.0480798 5.2146 0.080645 5.15171 0.126728 5.09367L4.00922 0.203166C4.11674 0.067722 4.25115 0 4.41244 0C4.57373 0 4.71198 0.0725594 4.82719 0.217678C4.9424 0.362797 5 0.532102 5 0.725594C5 0.919085 4.9424 1.08839 4.82719 1.23351L1.44009 5.5L4.82719 9.76649C4.93472 9.90193 4.98848 10.0687 4.98848 10.2669C4.98848 10.4654 4.93088 10.6372 4.81567 10.7823C4.70046 10.9274 4.56605 11 4.41244 11C4.25883 11 4.12442 10.9274 4.00922 10.7823Z"
      fill={color ? color : "white"}
    />
  </Svg>
);
export default BackIconSmall;