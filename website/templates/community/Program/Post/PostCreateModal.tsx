import { sessionTypes } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Post } from "@models/Posts/Post";
import CreateModal from "../CreateModal/CreateModal";
import PostCreateModalContent from "./PostCreateModalContent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  cohortId?: string;
  communityId: string;
  authorName: string;
  onBackdrop: () => void;
  gameId: string;
  authorUID: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  initalSessionType: sessionTypes;
  heading?: string;
  submitOverride?: (newPost: Post) => void;
  liveAbsent?: boolean;
}

const PostCreateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onBackdrop,
  authorUID,
  authorName,
  authorImage,
  initalSessionType,
  eventId,
  cohortId,
  communityId,
  heading,
  submitOverride,
  liveAbsent,
  gameId,
}) => {
  //   console.log("new", newSession);

  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onBackdrop}
        onCloseModal={onClose}
        onButtonPress={() => {}}
        heading={""}
      >
        <PostCreateModalContent
          isOpen={isOpen}
          onClose={onClose}
          gameId={gameId}
          authorUID={authorUID}
          authorName={authorName}
          authorImage={authorImage}
          initalSessionType={initalSessionType}
          eventId={eventId}
          cohortId={cohortId}
          communityId={communityId}
          heading={heading}
          submitOverride={submitOverride}
          liveAbsent={liveAbsent}
        />
      </CreateModal>
    </>
  );
};

export default PostCreateModal;
