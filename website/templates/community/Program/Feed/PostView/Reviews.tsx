import { Divider } from "@mui/material";
import { Post } from "@models/Posts/Post";
import clsx from "clsx";
import ReviewView from "./ReviewView";

interface Props {
  reviews: Post[];
  communityId: string;
}

const Reviews: React.FC<Props> = ({ reviews, communityId }) => {
  return (
    <div className="">
      {reviews.map((post, index) => {
        return (
          <div key={post.id} className={clsx(index === 0 ? "" : "pt-4")}>
            <ReviewView
              post={post}
              scoreVisible={communityId === post.creatorId}
            />

            {index === reviews.length - 1 ? (
              <div className="pb-4" />
            ) : (
              <div className="pt-4">
                <Divider />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
