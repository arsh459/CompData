import { Post } from "@models/Posts/Post";
import { getHeight } from "@templates/community/Program/getAspectRatio";
// import MediaCarouselV2 from "@templates/listing/HeaderImage/MediaCarouselV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { format } from "date-fns";
// import MediaGridV2 from "@templates/listing/MediaGrid/MediaGridV2";

interface Props {
  post: Post;
}

const PostSnippet: React.FC<Props> = ({ post }) => {
  return (
    <div className="w-64 border p-2">
      <p className="text-gray-500 text-xs pb-1">
        {format(new Date(post.updatedOn), "h:mmaaa d MMM")}
      </p>
      {post.media ? (
        <>
          <div className="">
            {post.media && post.media.length ? (
              <MediaTile
                width={200}
                height={getHeight(post.media[0], 200)}
                widthString="w-40"
                alt="media"
                media={post.media[0]}
              />
            ) : null}
          </div>
        </>
      ) : null}
      <div className="pt-2">
        <p className="text-sm text-gray-700 line-clamp-2">{post.text}</p>
      </div>
    </div>
  );
};

export default PostSnippet;
