import clsx from "clsx";
import React from "react";
import { colors } from "./constants";
import ColorShade from "templates/profile/ProfileHeader/ColorShade";

interface Props {
  onClick: (sh: number) => void;
  selectedColor: string;
  //   shadeNumber: number;
}

const ColorPannel: React.FC<Props> = ({
  onClick,
  selectedColor,
  //   shadeNumber,
}) => {
  return (
    <div
      className={clsx("flex p-2 space-x-4 bg-gray-200 shadow-xl rounded-lg")}
    >
      {colors.map((color, index) => {
        return (
          <div key={color}>
            <ColorShade
              shadeNumber={index}
              selected={color === selectedColor}
              onClick={onClick}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorPannel;
