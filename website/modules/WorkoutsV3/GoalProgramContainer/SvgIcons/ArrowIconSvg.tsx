import * as React from "react";
interface Props {
  color?: string;
  side: string;
}
const ArrowIconSvg: React.FC<Props> = ({ color, side }) => {
  return (
    <svg
      width={13}
      height={24}
      stroke={color ? color : "#FFF"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {side === "right" && <path d="M.5 1l11 11-11 11" />}
      {side === "left" && <path d="M12 23L1 12 12 1" />}
    </svg>
  );
};

export default ArrowIconSvg;
