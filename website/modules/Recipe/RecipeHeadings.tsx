import clsx from "clsx";
import React from "react";
interface Props {
  primaryText?: string;
  secondaryText?: string;
}
const RecipeHeadings: React.FC<Props> = ({ primaryText, secondaryText }) => {
  return (
    <div
      className={clsx(
        "bg-white/25 my-4",
        secondaryText && "flex justify-between items-center"
      )}
    >
      <p className="font-popSB px-4 text-white text-base sm:text-lg ">
        {primaryText}
      </p>
      {secondaryText ? (
        <p className="font-popSB px-4 text-white text-base sm:text-lg ">
          {secondaryText}
        </p>
      ) : null}
    </div>
  );
};

export default RecipeHeadings;
