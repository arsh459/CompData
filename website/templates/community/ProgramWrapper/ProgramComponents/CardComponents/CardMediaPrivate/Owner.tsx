import { Post } from "@models/Posts/Post";

interface Props {
  post: Post;
  onEditPost?: (post: Post) => void;
  onViewMedia: () => void;
}

const Owner: React.FC<Props> = ({ post, onEditPost, onViewMedia }) => {
  return (
    <div className="bg-[#111111D6] border border-[#E0E0E0] rounded-3xl overflow-hidden mt-4">
      <div className="flex items-center p-2.5 iphoneX:px-4 iphoneX:py-2.5">
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_HybfY4rRf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659167051451`}
          className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-2 iphoneX:mr-3"
          alt="private icon"
        />
        <h3 className="flex-1 iphoneX:text-xl font-semibold">
          This post is Private
        </h3>
      </div>
      <p className="text-xs iphoneX:text-base border border-[#E0E0E0] p-2.5 iphoneX:px-4 iphoneX:py-2.5">
        Share this post with the community. Best post will{" "}
        <span className="text-[#FF5F75]">get a Special Prize</span> and will be
        featured in spotlight.
      </p>
      <div className="flex items-center text-sm iphoneX:text-lg font-medium">
        <button
          className="flex-1 flex justify-center items-center px-3 py-2 iphoneX:px-4 iphoneX:py-3 bg-[#261C3D] border-r border-[#E0E0E0]"
          onClick={onViewMedia}
        >
          <img
            src={`https://ik.imagekit.io/socialboat/Group_Z1TYpoYwS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659167185793`}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-2 iphoneX:mr-3"
            alt="media icon"
          />
          <p>View Media</p>
        </button>
        <button
          className="flex-1 flex justify-center items-center px-3 py-2 iphoneX:px-4 iphoneX:py-3 bg-[#FF556C]"
          onClick={() => onEditPost && onEditPost(post)}
        >
          <img
            src={`https://ik.imagekit.io/socialboat/Group_425_iSstqbcSo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659167185633`}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-2.5 iphoneX:mr-4"
            alt="share icon"
          />
          <p>Share post</p>
        </button>
      </div>
    </div>
  );
};

export default Owner;
