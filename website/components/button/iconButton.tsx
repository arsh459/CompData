//packages
import React from "react";
import clsx from "clsx";
//local
interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  bgColor?: string;
  //   appearance: "outline" | "contained" | "ghost" | "control";
  //   size?: "small" | "medium";
  //   color?: "primary" | "success";
  //   styleButton?: {[key: string]: string};
  //   selected?: boolean;
  //   variant?: string;
}
const IconButton: React.FC<IButtonProps> = ({
  onClick,
  //   children,
  type,
  bgColor,
  //   size,
  //   color,
  //   appearance,
}) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          //   size === "small" ? "py-1.5 px-5" : "py-2.5 px-5",
          "p-1 rounded-full",
          bgColor ? bgColor : "bg-gray-300",
          //   "bg-orange-500",
          "flex items-center  justify-center",
          "focus:outline-none",
          //   "w-full",
          "shadow-lg",
          "hover:shadow-xl"
          // 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg ',
        )}
      >
        <img
          alt="close-icon"
          src="/images/close-outline.svg"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
};

export default IconButton;
