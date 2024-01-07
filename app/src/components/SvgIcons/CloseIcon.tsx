import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const CloseIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 19 19"
      fill="none"
      stroke={color ? color : "#FFFFFF"}
    >
      <Path d="M1 1L18 18" />
      <Path d="M18.5 1L1.5 18" />
    </Svg>
  );
};

export default CloseIcon;
