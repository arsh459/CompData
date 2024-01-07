// import { reviews, totalRating } from "./constants";
import clsx from "clsx";
import Rating from "@components/rating/rating";
import { formatWithCommas } from "utils/number";

interface Props {
  rating: number;
  ratingSplit: number[];
  totalRatings: number;
}

const ReviewHeader: React.FC<Props> = ({
  rating,
  ratingSplit,
  totalRatings,
}) => {
  return (
    <div>
      <div className={clsx("flex justify-between items-center")}>
        <div className={clsx("flex items-center")}>
          <p className={clsx("text-gray-700 text-2xl pr-1")}>{rating}</p>
          <p className={clsx("text-gray-500 text-xs")}>out of 5</p>
        </div>

        <div>
          <Rating rating={rating} />
          <p className="text-gray-600 text-xs text-right">
            {formatWithCommas(totalRatings)} reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
