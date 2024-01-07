import StartWorkoutBtn from "./StartWorkoutBtn";
import PostModal from "./PostModal";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { postTypes } from "@hooks/community/v2/useCommunityParamsV3";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { Post } from "@models/Posts/Post";
import {
  // where,
  DocumentReference,
  // startAfter,
} from "firebase/firestore";
// import Link from "next/link";

interface Props {
  signedInUserId?: string;
  eventId: string;
  communityId?: string;
  authorName: string;
  gameId: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  leaderKey: string;
  eventKey: string;
  postType?: postTypes;
  editingPost?: Post;
  onCancelEditPost?: () => void;
  setPosts: Dispatch<SetStateAction<{ post: Post; ref: DocumentReference }[]>>;
}

const PostProgram: React.FC<Props> = ({
  signedInUserId,
  eventId,
  communityId,
  authorName,
  gameId,
  authorImage,
  leaderKey,
  eventKey,
  postType,
  editingPost,
  onCancelEditPost,
  setPosts,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (editingPost?.id) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [editingPost?.id]);

  const onClose = () => {
    setIsOpen(false);
    if (onCancelEditPost) {
      onCancelEditPost();
    }
  };

  // console.log("ed", editingPost);

  return (
    <>
      <div
        className={clsx(
          "max-w-md mx-auto fixed bottom-0 left-0 right-0 z-40 w-full h-16 iphoneX:h-20 flex p-2.5 iphoneX:p-4",
          "bg-gradient-to-b from-[#EEEEEE]/90 to-[#E7E7E7]/90 backdrop-blur-[144px]",
          isOpen && "hidden"
        )}
      >
        {postType ? null : (
          <div
            className="flex-1 flex items-center mr-2.5 iphoneX:mr-4 px-4 text-[#666666] text-sm iphoneX:text-lg rounded-full border border-[#666666]"
            onClick={() => {
              setIsOpen(true);
              weEventTrack("gameCommunity_writePost", {});
            }}
          >
            <p className="border-l-2 border-[#666666] pl-2 whitespace-nowrap">
              Write post
            </p>
          </div>
        )}

        <a
          href={`/${leaderKey}/${eventKey}/workout`}
          className={clsx(postType ? "flex-[0.6] mx-auto" : "flex-1")}
          onClick={() =>
            weEventTrack("gameCommunity_startWorkout", {
              userKey: leaderKey,
              eventKey: eventKey,
              pageName: "workout",
            })
          }
        >
          <StartWorkoutBtn />
        </a>
      </div>
      <PostModal
        isOpen={isOpen}
        editingPost={editingPost}
        onCloseModal={onClose}
        setPosts={setPosts}
        signedInUserId={signedInUserId}
        eventId={eventId}
        communityId={communityId}
        authorName={authorName}
        gameId={gameId}
        authorImage={authorImage}
        canAlterMedia={editingPost ? false : true}
      />
    </>
  );
};

export default PostProgram;
