import { TextField } from "@mui/material";
import { CourseReview } from "@models/Prizes/PrizeV2";

interface Props {
  review: CourseReview;
  deleteReview: (id: string) => Promise<void>;
  updateReview: (newFAQ: CourseReview) => Promise<void>;
  updateLocalReview: (key: "name" | "text", value: string) => void;
}

// const dayArray = Array.apply(null, Array(36));

const ReviewEditor: React.FC<Props> = ({
  review,
  deleteReview,
  updateReview,
  updateLocalReview,
}) => {
  //   const { badge, setBadge } = useBadge(gameId, badgeId);

  return (
    <div className="p-4 border">
      <div className="py-4">
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            label={"Name"}
            variant="outlined"
            onChange={(val) => updateLocalReview("name", val.target.value)}
            value={review?.name}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            label={"Text"}
            variant="outlined"
            onChange={(val) => updateLocalReview("text", val.target.value)}
            value={review?.text}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="flex">
        <p
          onClick={() => deleteReview(review.id)}
          className="text-red-500 px-4"
        >
          Delete
        </p>
        <p onClick={() => updateReview(review)} className="text-green-500 px-4">
          Save
        </p>
      </div>
    </div>
  );
};

export default ReviewEditor;
