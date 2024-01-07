import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const RightArrowIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 13 24" fill="none">
      <Path d="M.5 1l11 11-11 11" fill={color ? color : "#FFF"} />
    </Svg>
  );
};

export default RightArrowIcon;
