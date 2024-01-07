// import {
//   copyChallengeForCreator,
//   saveCopiedChallenge,
// } from "@models/Event/challengeInvite";
// import { EventInterface } from "@models/Event/Event";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { Post } from "@models/Posts/Post";
// import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import PostCreateModal from "../Post/PostCreateModal";

// import JoinChallengeButton from "./JoinChallengeButton";

interface Props {
  //   eventId: string;
  //   cohortId: string;
  //   authorUID?: string;
  //   authorName?: string;
  //   authorImg?: CloudinaryMedia;

  //   selectedEvent: EventInterface;
  //   authorKey?: string;
  // participatingCommunity?: string;
  childEventsPresent?: boolean;
}

const JoinChallengeWidget: React.FC<Props> = ({
  //   selectedEvent,
  //   cohortId,
  //   authorImg,
  //   authorName,
  //   authorUID,
  //   authorKey,
  // participatingCommunity,
  childEventsPresent,
}) => {
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const onClose = () => setIsOpen(false);
  //   const onOpen = () => {
  //     if (authorKey && authorUID) {
  //       setIsOpen(true);
  //     } else if (authorUID && !authorKey) {
  //       router.push("https://socialboat.live/onboard");
  //     } else {
  //       // authenticate
  //     }
  //   };

  //   const router = useRouter();

  //   const onSubmit = async (post: Post) => {
  //     if (authorUID && authorKey) {
  //       const copiedEvent = copyChallengeForCreator(
  //         selectedEvent,
  //         authorUID,
  //         post.media,
  //         post.text
  //       );

  //       // save your challenge
  //       await saveCopiedChallenge(
  //         selectedEvent.ownerUID,
  //         copiedEvent,
  //         { ...post, eventId: copiedEvent.id },
  //         cohortId
  //       );

  //       // save id
  //       router.push(
  //         `https://${authorKey}.socialboat.live/?eventId=${selectedEvent.id}`
  //       );
  //     }
  //   };
  return (
    <>
      {/* {authorUID ? (
        <PostCreateModal
          submitOverride={onSubmit}
          heading="Tell us about your program..."
          isOpen={isOpen}
          onClose={onClose}
          eventId={selectedEvent.id}
          cohortId={cohortId}
          communityId={authorUID}
          authorName={authorName ? authorName : ""}
          onBackdrop={onClose}
          authorUID={authorUID}
          authorImage={authorImg}
          initalSessionType="activity"
        />
      ) : null} */}
      <div className="flex flex-col items-center">
        {/* <div className="flex">
          <JoinChallengeButton
            text={
              authorUID && authorKey
                ? "Join Challenge"
                : authorUID && !authorKey
                ? "Become a creator"
                : "Sign up"
            }
            onClick={onOpen}
          />
        </div> */}
        {childEventsPresent ? (
          <>
            {/* <div>
              <LineDivider />
            </div> */}
            <div className="flex items-center pt-2">
              <>
                <p className="text-2xl font-medium text-gray-700">
                  Participate with
                </p>
                <p className="pl-2 text-xl">👇</p>
              </>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default JoinChallengeWidget;
