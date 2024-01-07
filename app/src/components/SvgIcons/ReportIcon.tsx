import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const ReportIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 22 22"
      fill={color ? color : "#FFFFFF"}
    >
      <Path d="M15.559 0H6.44L0 6.441v9.118L6.441 22h9.118L22 15.559V6.44L15.559 0zm3.997 14.544l-5.012 5.012H7.456l-5.012-5.012V7.456l5.012-5.012h7.088l5.012 5.012v7.088z" />
      <Path d="M11 17a1 1 0 100-2 1 1 0 000 2zM10 5h2v8h-2V5z" />
    </Svg>
  );
};

export default ReportIcon;
