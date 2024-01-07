// import { createNewPostv2, saveNewPostV2 } from "./createPostV2";
// import { Activity } from "@models/Activities/Activity";
import { Post } from "@models/Posts/Post";
import { useState } from "react";
import { saveNewClap } from "@models/Posts/createUtils";
import ShareModal from "@components/ShareModal";
// import Link from "next/link";
import { DocumentReference } from "firebase/firestore";

interface Props {
  uid: string;
  // avtivity: Activity;
  postRef?: DocumentReference;
  currentPost: Post;
  clapperId?: string;
  isClapperCreator?: boolean;
}

const CardActions: React.FC<Props> = ({
  currentPost,
  // avtivity,
  uid,
  clapperId,
  postRef,
  isClapperCreator,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    if (clapperId) {
      if (currentPost) {
        // const postRef = avtivity.postRef,
        const communityId = currentPost.communityId;
        if (postRef && communityId) {
          saveNewClap(postRef, clapperId, communityId, uid);
        }
      }

      //   else {
      //     const eventId = avtivity.postId,
      //       creatorId = avtivity.authorUID,
      //       view = "public",
      //       createdOn = avtivity.createdOn ? avtivity.createdOn : Date.now();
      //     saveNewPostV2(
      //       createNewPostv2(eventId, creatorId, view, createdOn),
      //       avtivity,
      //       uid,
      //       clapperId,
      //       isClapperCreator ? isClapperCreator : false
      //     );
      //   }
    }
  };

  //   console.log("c", currentPost);

  return (
    <>
      <ShareModal
        isOpen={isVisible}
        onBackdrop={() => setIsVisible(false)}
        onButtonPress={() => {}}
        onCloseModal={() => setIsVisible(false)}
        shareURL={`https://www.socialboat.live/feed/${currentPost?.gameId}?postId=${currentPost?.id}`}
      />
      <div className="flex justify-between items-center not-italic p-2 bg-[#F2F2F7] border border-[#E9E9E9] rounded-lg">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="pr-2"
            src={`https://ik.imagekit.io/socialboat/Group_1_ednlY3ZF9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148049`}
          />
          {currentPost?.numClaps}
        </div>
        <a
          href={`/feed/${currentPost?.gameId}?postId=${currentPost?.id}`}
          // passHref
        >
          <div className="flex justify-center items-center cursor-pointer">
            <img
              className="pr-2"
              src={`https://ik.imagekit.io/socialboat/Vector_qKsbpfH0k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148032`}
            />
            {currentPost?.numCheckins}
          </div>
        </a>
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => setIsVisible(true)}
        >
          <img
            className="pr-2"
            src={`https://ik.imagekit.io/socialboat/Vector__1__Mq-GbuXZi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984147182`}
          />
        </div>
      </div>
    </>
  );
};

export default CardActions;
