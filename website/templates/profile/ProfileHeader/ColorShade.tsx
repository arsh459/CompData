import clsx from "clsx";
import React from "react";
import { colors } from "./constants";

interface Props {
  shadeNumber: number;
  selected?: boolean;
  onClick: (s: number) => void;
}

const ColorShade: React.FC<Props> = ({ selected, onClick, shadeNumber }) => {
  return (
    <div
      className={clsx(
        "rounded-full shadow-sm hover:shadow-2xl cursor-pointer w-8 h-8",
        `bg-gradient-to-b ${colors[shadeNumber]} to-white`,
        selected ? "ring-orange-500 ring-2" : ""
      )}
      onClick={() => onClick(shadeNumber)}
    ></div>
  );
};

export default ColorShade;
