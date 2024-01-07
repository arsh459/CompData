// import { usePostReview } from "@hooks/community/usePostReviews";
import { profileClick } from "@analytics/click/wrappers";
import { Post } from "@models/Posts/Post";
import { postButtonLabels } from "../../PostSection";
import PostContent from "./PostContent";
// import Reviews from "./Reviews";
import UserPhoto from "./UserPhoto";

interface Props {
  post: Post;
  communityId: string;
  setPostLabel: (newPostLabel: postButtonLabels) => void;
}

const PostView: React.FC<Props> = ({ post, setPostLabel, communityId }) => {
  // const { postReviews } = usePostReview(post.eventId, post.id);

  // console.log("post", postReviews);

  return (
    <div className="shadow-md bg-white rounded-lg hover:shadow-lg">
      <div className="p-4">
        <div>
          <UserPhoto
            name={post.creatorName}
            img={post.creatorImg}
            placeholderName="Boat user"
            onImgClick={() => {
              profileClick();
            }}
            sessionName={post.sessionName}
            updatedOn={post.updatedOn}
          />
        </div>
        <div className="pt-4">
          <PostContent
            text={post.text}
            media={post.media}
            // updatedOn={post.updatedOn}
            // sessionName={post.sessionName}
            // reviewCount={postReviews.length}
          />
        </div>

        <div className="pt-2">
          {/* <PostSection
            // setPostLabel={setPostLabel}
            // join={true}
            postButtons={postButtons}
            justifySettings="justify-evenly"
          /> */}
        </div>
      </div>

      <div className="p-4 pt-0">
        {/* <Reviews reviews={postReviews} communityId={communityId} /> */}
      </div>
    </div>
  );
};

export default PostView;

// const postButtons: PostButton[] = [
//   // {
//   //   text: "Upvote",
//   //   icon: "https://img.icons8.com/metro/26/000000/like.png",
//   //   selectedIcon: "https://img.icons8.com/ultraviolet/40/000000/like--v1.png",
//   //   selected: false,
//   //   key: "upvote",
//   // },
//   // {
//   //   text: "Review",
//   //   icon: "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-magnifying-glass-interface-kiranshastry-lineal-kiranshastry.png",
//   //   selectedIcon:
//   //     "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-magnifying-glass-interface-kiranshastry-lineal-kiranshastry.png",
//   //   selected: false,
//   //   key: "review",
//   // },
//   {
//     text: "Comment",
//     icon: "https://img.icons8.com/ios/100/000000/reply-arrow.png",
//     selectedIcon: "https://img.icons8.com/ios/100/000000/reply-arrow.png",
//     selected: false,
//     key: "post",
//   },
// ];
