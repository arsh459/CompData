import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const UpgradeIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.067 17.071A9.997 9.997 0 0010 0 10.001 10.001 0 00.193 11.952a9.997 9.997 0 002.74 5.12 9.99 9.99 0 0014.134 0zM7.471 9.015a.779.779 0 01-1.096 0 .788.788 0 010-1.096l3.077-3.076a.779.779 0 011.096 0l3.077 3.076a.779.779 0 01-1.096 1.096L10 6.477 7.471 9.015zm0 5.384a.779.779 0 01-1.096 0 .788.788 0 010-1.096l3.077-3.076a.779.779 0 011.096 0l3.077 3.076a.78.78 0 01-1.096 1.096L10 11.86l-2.529 2.538z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default UpgradeIcon;
