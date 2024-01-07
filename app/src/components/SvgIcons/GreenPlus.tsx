import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
  iconColor?: string;
}
export const GreenPlus: React.FC<Props> = ({ color, iconColor }) => {
  return (
    <Svg
      className="w-full h-full"
      fill={color ? color : "#fff"}
      viewBox="0 0 15 14"
    >
      <Path
        d="M7.5 13V7M7.5 7V1M7.5 7H14M7.5 7H1"
        stroke={iconColor ? iconColor : "#51FF8C"}
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default GreenPlus;
