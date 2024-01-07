import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
// import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
// import ProgressBar from "./ProgressBar";
// import ActionBar from "./ActionBar";
// import ActMedia from "./ActMedia";
// import { UserInterface } from "@models/User/User";
import TicketModalContent from "./TicketModalContent";
import { usePostWithRef } from "@hooks/activities/usePostWithRef";
import { Activity } from "@models/Activities/Activity";
import {
  getCalTolFP,
  // getReason,
} from "@templates/community/NewCommunitySection/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  signedInUserId: string;
  ticket: Activity;
  teamKey: string;
  eventKey: string;
  // onClearTicket: () => void;
}

const TicketModal: React.FC<Props> = ({
  isOpen,
  ticket,
  onClose,
  signedInUserId,
  teamKey,
  eventKey,
  // onClearTicket,
}) => {
  const { post } = usePostWithRef(isOpen ? ticket.postRef : undefined);

  const showPrivateCard: boolean =
    post?.view === "private" && post?.creatorId !== signedInUserId;

  return (
    <CreateModal
      onBackdrop={onClose}
      onButtonPress={onClose}
      isOpen={isOpen}
      heading=""
      onCloseModal={onClose}
      maxW="max-w-max"
      bgData="bg-[#F2F2F2]/90 backdrop-blur-xl"
    >
      <TicketModalContent
        onClose={onClose}
        postMedia={post?.media}
        activityName={ticket.activityName}
        reviewStatus={ticket.reviewStatus}
        fitPoints={getCalTolFP(ticket.calories)}
        tryAgainLink={`/${teamKey}/${eventKey}/workout?taskId=${ticket?.taskId}&postId=${post?.id}&tab=post_workout`}
        // text={getReason(ticket.activeMessage)}
        actId={ticket.id ? ticket.id : ticket.postId}
        taskId={ticket.taskId}
        ticketOwnerId={signedInUserId}
        onClearTicketCallback={onClose}
        activityAuthorId={ticket.authorUID}
        showPrivateCard={showPrivateCard}
      />
    </CreateModal>
  );
};

export default TicketModal;
