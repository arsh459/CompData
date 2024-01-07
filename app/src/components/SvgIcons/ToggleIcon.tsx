import * as React from "react";
import Svg, { Ellipse, Path } from "react-native-svg";
interface Props {
  color?: string;
}
const ToggleIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full aspect-square" viewBox="0 0 44 44" fill="none">
      <Ellipse
        cx={22}
        cy={22}
        rx={22}
        ry={22}
        transform="matrix(0 1 1 0 0 0)"
        fill="#2F2C4D"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.32 14.029a8 8 0 017.18 3.307V15.75a.75.75 0 111.5 0V20h-4.25a.75.75 0 110-1.5h1.727a6.5 6.5 0 00-11.783 1.924.748.748 0 01-1.179.43.75.75 0 01-.276-.794 8 8 0 017.081-6.031zm-3.4 14.853a8 8 0 0011.84-4.941.75.75 0 00-1.455-.364A6.5 6.5 0 0116.523 25.5h1.727a.75.75 0 100-1.5H14v4.25a.75.75 0 101.5 0v-1.586a8 8 0 002.42 2.217z"
        fill={color ? color : "#fff"}
      />
    </Svg>
  );
};

export default ToggleIcon;
