import { useBadgeReviews } from "@hooks/badges/useBadgeReviews";
import { Button } from "@mui/material";
import ReviewEditor from "./ReviewEditor";
// import { useBadgeTasks } from "@hooks/badges/useBadgeTasks";

interface Props {
  gameId: string;
  badgeId: string;
}

// const dayArray = Array.apply(null, Array(36));

const ReviewForm: React.FC<Props> = ({ gameId, badgeId }) => {
  //   const { badge, setBadge } = useBadge(gameId, badgeId);
  const { addReview, deleteReview, updateLocalReview, updateReview, reviews } =
    useBadgeReviews(gameId, badgeId);

  //   console.log("faq", faq);

  return (
    <div className="p-4">
      <div className="flex">
        <Button onClick={addReview}>Add Review</Button>
      </div>

      <div className="pt-8 flex flex-wrap">
        {reviews.map((item, index) => {
          return (
            <div className="m-4" key={item.id}>
              <ReviewEditor
                review={item}
                deleteReview={deleteReview}
                updateReview={updateReview}
                updateLocalReview={(key: "name" | "text", value: string) =>
                  updateLocalReview(index, key, value)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewForm;
