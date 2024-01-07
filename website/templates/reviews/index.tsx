import clsx from "clsx";
import ReviewSection, {
  ReviewsProps,
} from "@templates/profile/reviewSection/ReviewSection";

interface Props {
  reviewsProps: ReviewsProps;
}
const ReviewsTemplate: React.FC<Props> = ({ reviewsProps }) => {
  return (
    <div className="relative rounded-xl">
      <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl pb-20")}>
        <ReviewSection {...reviewsProps} />
      </div>
    </div>
  );
};

export default ReviewsTemplate;
