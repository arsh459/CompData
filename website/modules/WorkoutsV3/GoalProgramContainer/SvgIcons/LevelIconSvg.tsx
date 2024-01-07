interface Props {
  color?: string;
}

const LevelIconSvg: React.FC<Props> = ({ color }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y={15} width={6} height={22} rx={3} fill={color ? color : "#FFF"} />
      <rect
        x={9}
        y={7}
        width={6}
        height={30}
        rx={3}
        fill={color ? color : "#FFF"}
      />
      <rect x={18} width={6} height={37} rx={3} fill={color ? color : "#FFF"} />
    </svg>
  );
};

export default LevelIconSvg;
