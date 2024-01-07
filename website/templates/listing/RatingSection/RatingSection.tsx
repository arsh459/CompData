import clsx from "clsx";
import React from "react";
import Rating from "@components/rating/rating";
import { formatWithCommas } from "utils/number";

interface Props {
  rating?: number;
  numRatings?: number;
  editing?: boolean;
  active?: boolean;
}
const RatingSection: React.FC<Props> = ({
  rating,
  numRatings,
  editing,
  active,
}) => {
  return (
    <div className={clsx("relative")}>
      {!active && editing ? (
        <div className="opacity-30 bg-black absolute left-0 top-0 right-0 bottom-0" />
      ) : null}

      {rating ? (
        <div className="pl-4 pr-4 flex items-center">
          <div>
            <Rating rating={rating} />
          </div>

          <p className={clsx("text-sm pl-1 text-gray-700")}>{rating}</p>
          <p
            className={clsx(
              "text-sm text-gray-500 pl-1 underline cursor-pointer"
            )}
          >
            ({formatWithCommas(numRatings)} reviews)
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default RatingSection;
