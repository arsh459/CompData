import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const RetryIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 12 10"
      fill={color ? color : "#FFFFFF"}
    >
      <Path d="M9.25 3.25H7a.5.5 0 110-1h1.75V.5a.5.5 0 111 0v2.25a.5.5 0 01-.5.5z" />
      <Path d="M5.005 10A5.001 5.001 0 119.33 2.5a.5.5 0 01-.865.5 3.995 3.995 0 10.54 2 .5.5 0 111 0 5.006 5.006 0 01-5.001 5z" />
    </Svg>
  );
};

export default RetryIcon;
