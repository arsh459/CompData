export type LevelsTypes = "Beginner" | "Intermediate" | "Advance";

interface Props {
  color?: string;
  level?: LevelsTypes;
}

const LevelsIcon: React.FC<Props> = ({ color, level }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 9 9" fill="none">
      <rect
        x={0.5}
        y={4.398}
        width={2.358}
        height={4.401}
        rx={1.179}
        fill={color ? color : "#fff"}
        fillOpacity={level ? 1 : 0.25}
      />
      <rect
        x={3.445}
        y={2.203}
        width={2.358}
        height={6.601}
        rx={1.179}
        fill={color ? color : "#fff"}
        fillOpacity={level === "Intermediate" || level === "Advance" ? 1 : 0.25}
      />
      <rect
        x={6.391}
        width={2.358}
        height={8.802}
        rx={1.179}
        fill={color ? color : "#fff"}
        fillOpacity={level === "Advance" ? 1 : 0.25}
      />
    </svg>
  );
};

export default LevelsIcon;
