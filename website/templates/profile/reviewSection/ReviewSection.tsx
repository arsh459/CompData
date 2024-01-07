import { review } from "./constants";
import clsx from "clsx";
import ReviewHeader from "./ReviewHeader";
import Review from "@components/cards/review";
import Button from "@components/button/index";
import ReviewInput from "./ReviewInput";

export interface ReviewsProps {
  totalRating: number;
  ratingSplit: number[];
  numRatings: number;
  reviews: review[];
}

const ReviewSection: React.FC<ReviewsProps> = ({
  totalRating,
  ratingSplit,
  numRatings,
  reviews,
}) => {
  return (
    <div>
      <p className={clsx("font-semibold text-sm text-gray-700 pb-1")}>
        Reviews
      </p>
      <div className={clsx("")}>
        <ReviewHeader
          rating={totalRating}
          ratingSplit={ratingSplit}
          totalRatings={numRatings}
        />
        <div className="pt-4">
          <ReviewInput />
        </div>
        <div className={"pt-4"}>
          {reviews.map((item) => {
            return (
              <div key={item.name} className={clsx("pb-4")}>
                <Review
                  heading={item.heading}
                  name={item.name}
                  url={item.url}
                  text={item.review}
                  rating={item.rating}
                />
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <Button appearance="outline">
            <p className="capitalize text-sm text-gray-700">Read all</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
