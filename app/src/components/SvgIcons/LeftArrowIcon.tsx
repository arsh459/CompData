import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const LeftArrowIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 13 24" fill="none">
      <Path d="M12 23L1 12 12 1" fill={color ? color : "#FFF"} />
    </Svg>
  );
};

export default LeftArrowIcon;
