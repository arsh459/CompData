import Svg, { Path } from "react-native-svg";

interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const BackIcon: React.FC<Props> = ({ color, height, width }) => {
  return (
    <Svg
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      width={width ? width : "24"}
      fill={color ? color : "gray"}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </Svg>
  );
};
export default BackIcon;
