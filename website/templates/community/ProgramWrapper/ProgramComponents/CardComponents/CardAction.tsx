import { Post } from "@models/Posts/Post";
import { useEffect, useState } from "react";
import { saveNewClap } from "@models/Posts/createUtils";
import ShareModal from "@components/ShareModal";
import { DocumentReference } from "firebase/firestore";
import { UserInterface } from "@models/User/User";
import ReplyModal from "@components/ReplyModal";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import CardActionCounts from "./CardActionCounts";
// import { communityQueryV3, modalTypes } from "@hooks/community/v2/useCommunityParamsV3";
// import { useRouter } from "next/router";
// import { modalTypes } from "@hooks/community/v2/useCommunityParamsV3";

interface Props {
  numClaps: number | undefined;
  numCheckins: number | undefined;
  uid: string;
  currentPost: Post;
  postRef: DocumentReference;
  signedInUser: UserInterface;
  // showReplies?: boolean;
  shareURL: string;
  // onPostClick: () => void;
  // onGoBack: () => void;
  // modal?: modalTypes;

  communityId: string;
  eventId: string;
  gameId: string;
  isLive?: boolean;
}

const CardAction: React.FC<Props> = ({
  numClaps,
  numCheckins,
  uid,
  postRef,
  currentPost,
  signedInUser,
  // showReplies,
  shareURL,
  isLive,
  // onPostClick,
  // onGoBack,
  // modal,

  communityId,
  eventId,
  gameId,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false);
  const [claps, setClaps] = useState<number>(numClaps ? numClaps : 0);
  const [replies, setReplies] = useState<number>(numCheckins ? numCheckins : 0);

  // const router = useRouter();
  // const q = router.query as communityQueryV3;

  // console.log("showReplies", showReplies, isReplyModalOpen, currentPost.id);

  useEffect(() => {
    if (numClaps && !isLive) setClaps(numClaps);
  }, [numClaps, isLive]);
  useEffect(() => {
    if (numCheckins && !isLive) setReplies(numCheckins);
  }, [numCheckins, isLive]);

  const handleClick = async () => {
    if (currentPost) {
      const communityId = currentPost.communityId;
      if (postRef && communityId) {
        await saveNewClap(
          postRef,
          signedInUser.uid,
          communityId,
          uid,
          signedInUser.name,
          signedInUser.profileImage,
          currentPost.creatorName
        );
        setClaps((prev) => prev + 1);
      }
    }
  };

  // console.log("currentPost", currentPost.creatorName);

  return (
    <>
      <ShareModal
        isOpen={isShareModalOpen}
        onBackdrop={() => setIsShareModalOpen(false)}
        onButtonPress={() => {}}
        onCloseModal={() => setIsShareModalOpen(false)}
        shareURL={shareURL}
      />
      <ReplyModal
        isOpen={isReplyModalOpen}
        onCloseModal={() => {
          setIsReplyModalOpen(false);
          // onGoBack();
        }}
        currentPost={currentPost}
        postRef={postRef}
        signedInUser={signedInUser}
        gameId={gameId}
        communityId={communityId ? communityId : ""}
        eventId={eventId}
        setReplies={setReplies}
      />
      <div className="flex bg-[#F2F2F7] py-4">
        <div
          className="flex items-center justify-center w-1/3 cursor-pointer"
          onClick={() => {
            handleClick();
            weEventTrack("gameCommunity_postClap", {
              postid: currentPost.id,
            });
          }}
        >
          <img
            src={`https://ik.imagekit.io/socialboat/Group_1_ednlY3ZF9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148049`}
            alt="Clap Icon"
            className="w-4 iphoneX:w-6"
          />
          {claps ? <p className="pl-2">{claps}</p> : null}
        </div>
        <div className="w-px bg-[#E9E9E9]" />
        <div
          className="flex items-center justify-center w-1/3 cursor-pointer"
          onClick={() => {
            setIsReplyModalOpen(true);
            weEventTrack("gameCommunity_postReply", {
              postid: currentPost.id,
            });
          }}
        >
          <img
            src={`https://ik.imagekit.io/socialboat/Vector_qKsbpfH0k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148032`}
            alt="Comment Icon"
            className="w-4 iphoneX:w-6"
          />
          {replies ? <p className="pl-2">{replies}</p> : null}
        </div>
        <div className="w-px bg-[#E9E9E9]" />
        <div
          className="flex items-center justify-center w-1/3 cursor-pointer"
          onClick={() => {
            setIsShareModalOpen(true);
            weEventTrack("gameCommunity_postShare", {
              postid: currentPost.id,
            });
          }}
        >
          <img
            src={`https://ik.imagekit.io/socialboat/Vector__1__Mq-GbuXZi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984147182`}
            alt="Share Icon"
            className="w-4 iphoneX:w-6"
          />
        </div>
      </div>
      {claps || replies ? (
        <CardActionCounts
          numClaps={claps}
          postRef={postRef}
          setIsReplyModalOpen={setIsReplyModalOpen}
          replies={replies}
        />
      ) : null}
    </>
  );
};

export default CardAction;
