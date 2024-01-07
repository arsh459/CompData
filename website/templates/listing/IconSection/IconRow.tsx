import clsx from "clsx";
import React from "react";

interface Props {
  text: string;
  subtext?: string;
  italic?: boolean;
  viewStyle?: "mobile" | "desktop";
}
const IconSection: React.FC<Props> = ({
  children,
  text,
  italic,
  subtext,
  viewStyle,
}) => {
  return (
    <div className={clsx("flex")}>
      <div>{children}</div>
      <div className="pl-4">
        <p
          className={clsx(
            italic ? "italic" : "",
            "text-gray-700 font-semibold",
            viewStyle === "mobile" ? "text-sm" : " text-sm md:text-base "
          )}
        >
          {text}
        </p>
        <p className={clsx(italic ? "italic" : "", "text-gray-500 text-sm")}>
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default IconSection;
