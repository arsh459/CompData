interface Props {
  className?: string;
  color?: string;
}

const CancleIcon: React.FC<Props> = ({ className, color }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M1 1L23.5 23.5" stroke={color || "#FFFFFF"} strokeWidth="3" />
      <path
        d="M23.5 1L1.00001 23.5"
        stroke={color || "#FFFFFF"}
        strokeWidth="3"
      />
    </svg>
  );
};

export default CancleIcon;
