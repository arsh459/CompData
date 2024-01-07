import LoadingModal from "@components/loading/LoadingModal";
import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Post } from "@models/Posts/Post";
import { WorkoutSeries } from "@models/Workouts/Series";
import PostCreateModal from "@templates/community/Program/Post/PostCreateModal";
import BoatSelectModal from "./BoatSelectModal";
import NewCreatorModal from "./NewCreatorModal";
import OptionSelector from "./OptionSelector";

export type challengeModal =
  | "post"
  | "new-creator"
  | "team-select"
  | "none"
  | "bookModal"
  | "loading";

interface Props {
  modalState: challengeModal;
  onClose: () => void;

  eventId: string;
  cohortId: string;
  communityId: string;
  communityKey?: string;
  authorName?: string;
  authorUID?: string;
  authorImg?: CloudinaryMedia | AWSMedia;
  onPostClick: (post: Post) => void;
  childEvents: EventInterface[];
  eventSeries: WorkoutSeries[];
  onFreeClick: () => void;
  // onPaidClick: () => void;
}

const ChallengeModals: React.FC<Props> = ({
  onPostClick,
  eventId,
  cohortId,
  communityId,
  authorName,
  authorImg,
  authorUID,
  modalState,
  onClose,
  childEvents,
  communityKey,
  eventSeries,
  onFreeClick,
  // onPaidClick,
}) => {
  return (
    <>
      {modalState === "none" ? null : modalState === "post" && authorUID ? (
        <PostCreateModal
          submitOverride={onPostClick}
          heading="Tell us about your program..."
          isOpen={true}
          onClose={onClose}
          liveAbsent={true}
          eventId={eventId}
          gameId=""
          cohortId={cohortId}
          communityId={communityId}
          authorName={authorName ? authorName : ""}
          onBackdrop={onClose}
          authorUID={authorUID}
          authorImage={authorImg}
          initalSessionType="activity"
        />
      ) : modalState === "team-select" ? (
        <BoatSelectModal
          childEvents={childEvents}
          isOpen={true}
          onBackdrop={onClose}
          onClose={onClose}
        />
      ) : modalState === "new-creator" && communityKey ? (
        <NewCreatorModal
          eventId={eventId}
          leaderKey={communityKey}
          isOpen={true}
          onBackdrop={onClose}
          onClose={onClose}
        />
      ) : modalState === "loading" ? (
        <LoadingModal fill="#ff735c" width={48} height={48} />
      ) : modalState === "bookModal" ? (
        <OptionSelector
          eventSeries={eventSeries}
          isOpen={true}
          onBackdrop={onClose}
          onClose={onClose}
          onFreeClick={onFreeClick}
          onPaidClick={() => {}}
          // onPaidClick={onPaidClick}
        />
      ) : null}
    </>
  );
};

export default ChallengeModals;
