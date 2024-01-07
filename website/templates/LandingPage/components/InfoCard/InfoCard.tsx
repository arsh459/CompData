import clsx from "clsx";
import React from "react";

interface Props {
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  leftBare?: boolean;
  flexColDirection?: "flex-col" | "flex-col-reverse";
}

const InfoCard: React.FC<Props> = ({
  leftChildren,
  rightChildren,
  leftBare,
  flexColDirection,
}) => {
  return (
    <>
      <div
        className={clsx(
          //   "h-screen",
          flexColDirection ? flexColDirection : "flex-col",
          "flex justify-between items-center md:flex-row"
          // "border"
        )}
      >
        {leftBare ? (
          leftChildren
        ) : (
          <div className="h-1/2 md:h-5/6 w-full">
            <div className="h-full flex flex-col justify-center">
              {leftChildren}
            </div>
          </div>
        )}

        <div className="h-1/2 md:h-5/6 w-full">
          <div className="h-full flex flex-col justify-center ">
            {rightChildren}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
