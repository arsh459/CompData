//packages
import React from "react";
import clsx from "clsx";
//local
interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance: "outline" | "contained" | "ghost" | "control";
  size?: "small" | "medium";
  color?: "primary" | "success";

  //   styleButton?: {[key: string]: string};
  //   selected?: boolean;
  //   variant?: string;
}
const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  type,
  size,
  color,
  appearance,
}) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          size === "small" ? "py-1.5 px-5" : "py-2.5 px-5",
          "flex items-center  justify-center",
          "focus:outline-none text-white text-sm rounded-md",
          "w-full",
          "font-semibold",
          "shadow-md",
          "hover:shadow-lg",
          appearance === "outline"
            ? "border hover:text-gray-300"
            : appearance === "contained" && (!color || color === "primary")
            ? "bg-orange-500 hover:bg-orange-600"
            : appearance === "contained" && color === "success"
            ? "bg-green-500 hover:bg-green-600"
            : appearance === "control"
            ? "bg-gray-50 hover:bg-white"
            : ""
          // 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg ',
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
