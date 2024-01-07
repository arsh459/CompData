import React from "react";

interface Props {
  color?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const ArrowDirectionIcon: React.FC<Props> = ({ color, direction }) => {
  const rotation =
    direction === "top"
      ? "-90"
      : direction === "bottom"
      ? "90"
      : direction === "left"
      ? "180"
      : "0";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      className="w-full h-full"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <path
        d="M14.707 8.707a1 1 0 000-1.414L8.343.929A1 1 0 106.93 2.343L12.586 8l-5.657 5.657a1 1 0 101.414 1.414l6.364-6.364zM0 9h14V7H0v2z"
        fill={color ? color : "#FFFFFF"}
      />
    </svg>
  );
};

export default ArrowDirectionIcon;
