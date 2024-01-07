import clsx from "clsx";
import React from "react";
interface Props {
  text?: string;
  icon?: string;
  isSelected?: boolean;
  styleContainerTw?: string;
  textStyle?: string;
  onClick: () => void;
}
const ListElementCard: React.FC<Props> = ({
  icon,
  isSelected,
  text,
  styleContainerTw,
  textStyle,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center bg-[#343150] rounded-2xl py-5 px-4 mx-4 cursor-pointer",
        styleContainerTw,
        isSelected && "bg-white"
      )}
    >
      {icon ? (
        <img src={icon} className="w-8 h-8" alt={`${text}-icon`} />
      ) : null}
      <p
        className={clsx(
          "pl-2 flex-1 font-nunitoSB text-sm sm:text-base  tracking-tight",
          isSelected ? "text-[#222134]" : "text-white",
          textStyle
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default ListElementCard;
