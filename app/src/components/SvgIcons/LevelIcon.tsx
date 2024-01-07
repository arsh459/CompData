import Svg, { Rect } from "react-native-svg";

interface Props {
  color?: string;
}

const LevelIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 24 37" fill="none">
      <Rect y={15} width={6} height={22} rx={3} fill={color ? color : "#FFF"} />
      <Rect
        x={9}
        y={7}
        width={6}
        height={30}
        rx={3}
        fill={color ? color : "#FFF"}
      />
      <Rect x={18} width={6} height={37} rx={3} fill={color ? color : "#FFF"} />
    </Svg>
  );
};

export default LevelIcon;
