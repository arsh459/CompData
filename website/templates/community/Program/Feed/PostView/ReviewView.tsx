import { profileClick } from "@analytics/click/wrappers";
import { Post } from "@models/Posts/Post";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { getHeight } from "../../getAspectRatio";
import Scorer from "../Scorer";
// import PostDate from "./PostDate";
import UserPhoto from "./UserPhoto";
// import { Divider } from "@mui/material";

interface Props {
  post: Post;
  scoreVisible: boolean;
}

const ReviewView: React.FC<Props> = ({ post, scoreVisible }) => {
  return (
    <div className="">
      <div className="pt-0">
        <p className="text-xl">👇</p>
      </div>
      <div className="">
        <UserPhoto
          size="small"
          img={post.creatorImg}
          onImgClick={() => {
            profileClick();
          }}
          name={post.creatorName}
          updatedOn={post.updatedOn}
        />
      </div>
      <div className="flex">
        <div className="w-full">
          {post.text ? (
            <div className="pt-4">
              <p className="text-gray-500 text-sm prose">{post.text}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap">
            {scoreVisible ? (
              <div className="pt-4 w-1/4">
                <p className="text-gray-500 font-semibold text-center pb-1">
                  score
                </p>
                <Scorer score={post.score} />
                {/* <p className="text-xs text-gray-500 pt-1">
                *The score is only visible to you
              </p> */}
              </div>
            ) : null}

            {post.media.map((item) => {
              return (
                <div key={item.path} className={clsx("p-2")}>
                  <MediaTile
                    media={item}
                    width={400}
                    height={getHeight(item, 400)}
                    // widthString={"w-24"}
                    // heightString="h-24"
                    alt="media"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
