import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import ProgressBar from "./ProgressBar";
import ActionBar from "./ActionBar";
import ActMedia from "./ActMedia";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { reviewStatus } from "@models/Activities/Activity";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { useActivityTicket } from "@hooks/tickets/useActivityTicket";
import { clearTicket } from "@models/Activities/reportUtils";
import { getLeftButton } from "./utils";

interface Props {
  onClose: () => void;
  postMedia?: (CloudinaryMedia | AWSMedia)[];
  activityName: string;
  reviewStatus?: reviewStatus;
  fitPoints: number;
  tryAgainLink: string;
  actId: string;
  taskId?: string;
  ticketOwnerId: string;
  totalPoints?: number;
  activityAuthorId: string;
  onClearTicketCallback: () => void;
  showPrivateCard: boolean;
}

const TicketModalContent: React.FC<Props> = ({
  onClose,
  postMedia,
  totalPoints,
  taskId,
  fitPoints,
  activityName,
  // text,
  reviewStatus,
  activityAuthorId,
  actId,
  ticketOwnerId,
  onClearTicketCallback,
  tryAgainLink,
  showPrivateCard,
}) => {
  const { task } = useWorkoutTask(taskId, !totalPoints ? false : true);

  const { activityTicket } = useActivityTicket(
    activityAuthorId,
    ticketOwnerId,
    actId
  );

  const { text, link } = getLeftButton(
    reviewStatus,
    activityTicket?.reviewStatus,
    tryAgainLink,
    ticketOwnerId === activityAuthorId
  );

  // console.log("reviewStatus HERE", activityTicket);

  const onResolveTicket = async () => {
    // console.log("cleared", activityTicket?.id);
    onClearTicketCallback();

    if (activityTicket?.id)
      await clearTicket(
        activityAuthorId,
        actId,
        ticketOwnerId,
        activityTicket?.id
      );
  };

  // console.log(activityName);

  return (
    <div className="w-screen h-screen text-[#203C51] flex flex-col justify-center items-center overflow-y-scroll scrollbar-hide">
      <div className="w-full flex justify-between items-center px-8">
        <h2 className="text-lg iphoneX:text-2xl font-extrabold">
          Ticket Progress
        </h2>
        <CloseBtn onCloseModal={onClose} tone="dark" />
      </div>
      <ProgressBar
        reviewStatus={activityTicket?.reviewStatus}
        activityReviewStatus={reviewStatus}
      />
      <h4 className="iphoneX:text-xl font-extrabold">
        {activityName === "Post" || activityName === "Terra"
          ? "Custom Workout"
          : activityName}
      </h4>
      {postMedia ? (
        <ActMedia media={postMedia} showPrivateCard={showPrivateCard} />
      ) : null}
      {activityTicket?.reviewStatus === "PENDING" ? (
        <p className="text-xs iphoneX:text-base px-8 pb-4 iphoneX:pb-8 text-center">{`We are taking a look. Our response time is 10 minutes if posted between 8am - 1am`}</p>
      ) : (
        <>
          <h4 className="iphoneX:text-xl font-extrabold">
            {`Revaluated Points ${fitPoints}/${
              totalPoints ? totalPoints : task?.fitPoints
            }`}
          </h4>
          <p className="text-xs iphoneX:text-base text-center mt-2 pb-3 iphoneX:mb-6">
            {activityTicket?.judgeMessage
              ? activityTicket.judgeMessage
              : "Please contact support for reasoning"}
          </p>
        </>
      )}

      <ActionBar
        leftText={text}
        onClearTicket={onResolveTicket}
        leftButtonLink={link}
        isRevaluated={true}
      />
    </div>
  );
};

export default TicketModalContent;
