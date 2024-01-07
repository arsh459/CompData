interface Props {
  color?: string;
  borderColor?: string;
  opacity?: number;
}

const Pendulum: React.FC<Props> = ({ color, opacity, borderColor }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 99 234" fill="none">
      <circle
        cx={48.764}
        cy={215.383}
        r={17.686}
        fill={borderColor ? borderColor : "#7D4C65"}
      />
      <circle
        cx={48.764}
        cy={215.383}
        r={12.244}
        fill={color ? color : "#FFC1E0"}
      />
      <path
        d="M0 2a2 2 0 012-2h95a2 2 0 012 2v60.256a2 2 0 01-.948 1.701l-47.5 29.392a2 2 0 01-2.104 0L.948 63.957a2 2 0 01-.948-1.7V2z"
        fill={borderColor ? borderColor : "#7D4C65"}
      />

      <path
        d="M3 5.783a2 2 0 012-2h89a2 2 0 012 2v54.848a2 2 0 01-.968 1.713l-44.5 26.817a2 2 0 01-2.064 0l-44.5-26.817A2 2 0 013 60.63V5.783z"
        fill={color ? color : "#FFC1E0"}
      />
      <rect
        x={48}
        y={85.783}
        width={3}
        height={121}
        rx={1.5}
        fill={color ? color : "#FFC1E0"}
      />
    </svg>
  );
};

export default Pendulum;
