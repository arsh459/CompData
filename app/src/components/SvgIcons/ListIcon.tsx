import * as React from "react";
import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}

const ListIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full aspect-square" viewBox="0 0 10 10" fill="none">
      <Path
        d="M3 1.001H1.667A.667.667 0 001 1.668V9a.667.667 0 00.667.667h6.666A.667.667 0 009 9V1.668A.667.667 0 008.333 1H7"
        stroke={color ? color : "#fff"}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.333 3.667h3.333m-3.333 2h3.333m-3.333 2h3.333m-5.333-4H3m-.667 2H3m-.667 2H3M3.666.334h2.667a.667.667 0 110 1.333H3.666a.667.667 0 010-1.333z"
        stroke={color ? color : "#fff"}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ListIcon;
