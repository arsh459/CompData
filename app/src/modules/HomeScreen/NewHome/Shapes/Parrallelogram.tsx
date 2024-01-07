import Svg, { Path, Text } from "react-native-svg";
interface Props {
  color?: string;
  borderColor?: string;
}
const Parrallelogram: React.FC<Props> = ({ color, borderColor }) => {
  return (
    <Svg width={110} height={13} fill="none">
      <Path
        d="M.238 12.012L5.923.15h103.83l-5.502 11.862H.238z"
        fill={color ? color : "#0085E0"}
        stroke={borderColor ? borderColor : "#fff"}
        strokeWidth={0.3}
      />
      <Text fill={"#FFF"}>60%</Text>
    </Svg>
  );
};

export default Parrallelogram;
