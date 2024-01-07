import Svg, { Rect } from "react-native-svg";

export type DifficultyLevelsTypes = "easy" | "medium" | "hard";

interface Props {
  color?: string;
  level?: DifficultyLevelsTypes;
}

const DifficultyLevelsIcon: React.FC<Props> = ({ color, level }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 9 9" fill="none">
      <Rect
        x={0.5}
        y={4.398}
        width={2.358}
        height={4.401}
        rx={1.179}
        fill={color ? color : "#fff"}
        fillOpacity={level ? 1 : 0.25}
      />
      <Rect
        x={3.445}
        y={2.203}
        width={2.358}
        height={6.601}
        rx={1.179}
        fill={color ? color : "#fff"}
        fillOpacity={level === "medium" || level === "hard" ? 1 : 0.25}
      />
      <Rect
        x={6.391}
        width={2.358}
        height={8.802}
        rx={1.179}
        fill={color ? color : "#fff"}
        fillOpacity={level === "hard" ? 1 : 0.25}
      />
    </Svg>
  );
};

export default DifficultyLevelsIcon;
