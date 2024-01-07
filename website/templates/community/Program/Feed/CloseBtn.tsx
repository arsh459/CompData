interface Props {
  onCloseModal?: () => void;
  tone?: "dark";
  color?: string;
  size?: "small" | "medium" | "large";
  type?: "plus" | "minus";
  strokeWidth?: number;
}

const CloseBtn: React.FC<Props> = ({
  onCloseModal,
  tone,
  color,
  size,
  type,
  strokeWidth,
}) => {
  const remoteSize = size === "small" ? 12 : size === "medium" ? 16 : 20;
  return (
    <div className="cursor-pointer" onClick={onCloseModal}>
      <svg
        width={remoteSize}
        height={remoteSize}
        viewBox="0 0 20 20"
        fill="none"
        style={{ transform: type ? "rotate(45deg)" : undefined }}
      >
        {type === "minus" ? null : (
          <path
            d="M1 1L18 18"
            strokeWidth={strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={color ? color : tone === "dark" ? "black" : "white"}
          />
        )}
        <path
          d="M18.5 1L1.5 18"
          strokeWidth={strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color ? color : tone === "dark" ? "black" : "white"}
        />
      </svg>
    </div>
  );
};

export default CloseBtn;
