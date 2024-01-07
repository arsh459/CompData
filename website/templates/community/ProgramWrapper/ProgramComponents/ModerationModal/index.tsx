import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import MainContainer from "./MainContainer";
import ReportContainer from "./ReportContainer";
// import RevaluateContainer from "./RevaluateContainer";
// import ExpiredContainer from "./ExpiredContainer";
import { useState } from "react";
import { Activity } from "@models/Activities/Activity";
// import Ticket from "../Ticket";
import TicketModalContent from "../TicketModal/TicketModalContent";
import { Post } from "@models/Posts/Post";
import {
  getCalTolFP,
  // getReason,
  // getReviewMessage,
} from "@templates/community/NewCommunitySection/utils";
// import { clearTicket } from "@models/Activities/reportUtils";

const milliseconds = 24 * 60 * 60 * 1000;

interface Props {
  activity: Activity;
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  totalFitPoints?: number;
  authorName: string;
  authorPhone: string;

  // updatedOn: number;
  // isUserActivity: boolean;
  // actId: string;
  // authorId: string;
  ticketOwnerId: string;
  tryAgainURL: string;
  // reviewStatus?: reviewStatus;
}

const ModerationModal: React.FC<Props> = ({
  // updatedOn,
  // isUserActivity,
  // actId,
  activity,
  post,
  ticketOwnerId,
  isOpen,
  onClose,
  totalFitPoints,
  authorName,
  authorPhone,
  tryAgainURL,
  // reviewStatus,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalState, setModalState] = useState<"main" | "report" | "ticket">(
    "main"
  );

  const expiry: number = activity.activeMessage
    ? activity.activeMessage?.createdOn + milliseconds
    : activity.updatedOn + milliseconds;

  // console.log("expiry", expiry);

  const onGoToTicket = () => {
    // setIsOpen(false);
    setModalState("ticket");
  };

  const onNext = () => {
    if (
      activity.reviewRequestedBy &&
      activity.reviewRequestedBy.includes(ticketOwnerId) // ticket owner exists
      // activity?.reviewStatus === "REVIEW_REQUEST" ||
      // activity.reviewStatus === "TICKET_REVIEWED"
    ) {
      setModalState("ticket");
    } else {
      setModalState("report");
    }
  };

  const showPrivateCard: boolean =
    post.view === "private" && post.creatorId !== ticketOwnerId;

  // const onCloseTicket = async () => {
  // onClose();
  // clearTicket(
  //   activity.authorUID,
  //   activity.id ? activity.id : activity.postId,
  //   ticketOwnerId
  // );
  // };

  // useEffect(() => {
  //   if (expiry < Date.now()) {
  //     setModalState("expired");
  //   }
  // }, [expiry]);

  return (
    <>
      <CreateModal
        onBackdrop={onClose}
        onButtonPress={onClose}
        isOpen={isOpen}
        heading=""
        onCloseModal={onClose}
        maxW="max-w-max"
        bgData="bg-[#F2F2F2]/90 backdrop-blur-xl"
      >
        <div className="w-screen h-screen text-[#203C51] flex flex-col justify-center items-center p-8">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-lg iphoneX:text-2xl font-extrabold">
              Review Post
              {/* {activity.reviewStatus === "REVIEW_REQUEST"
                ? "Post in review"
                : "Have an issue?"} */}
            </h2>
            {/* {modalState === "main" ? (
              <h2 className="text-lg iphoneX:text-2xl font-extrabold">Have an issue?</h2>
            ) : modalState === "report" ? (
              <div className="flex items-center">
                <img
                  src={`https://ik.imagekit.io/socialboat/Group_181_xvqWxR7Py.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653724850315`}
                  alt="caution icon"
                  className="mr-2"
                />
                <h2 className="text-[#FD6F6F] text-lg iphoneX:text-2xl font-extrabold">
                  Report
                </h2>
              </div>
            ) : modalState === "revaluate" ? (
              <div className="flex items-center">
                <img
                  src={`https://ik.imagekit.io/socialboat/Vector__3__tmNXIKpTS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653737909544`}
                  alt="caution icon"
                  className="mr-2"
                />
                <h2 className="text-[#0085E0] text-lg iphoneX:text-2xl font-extrabold">
                  Revaluate
                </h2>
              </div>
            ) : (
              <div />
            )} */}

            {modalState !== "ticket" ? (
              <CloseBtn onCloseModal={onClose} tone="dark" />
            ) : null}
          </div>
          {
            modalState === "ticket" ? (
              <TicketModalContent
                onClose={onClose}
                tryAgainLink={tryAgainURL}
                postMedia={post.media}
                activityName={activity.activityName}
                activityAuthorId={activity.authorUID}
                ticketOwnerId={ticketOwnerId}
                // text={getReason(activity.activeMessage)}
                fitPoints={getCalTolFP(activity.calories)}
                reviewStatus={activity.reviewStatus}
                actId={activity.id ? activity.id : activity.postId}
                totalPoints={totalFitPoints}
                taskId={activity.taskId}
                onClearTicketCallback={onClose}
                showPrivateCard={showPrivateCard}
                // fitPoints={}
              />
            ) : modalState === "main" ? (
              <MainContainer
                expiry={expiry}
                // reviewStatus="REVIEW_REQUEST"
                // reviewStatus={activity.reviewStatus}
                isUserActivity={activity?.authorUID === ticketOwnerId}
                onReport={onNext}
                hasTicket={
                  activity.reviewRequestedBy &&
                  activity.reviewRequestedBy.includes(ticketOwnerId)
                }
                // onRevaluate={() => setModalState("revaluate")}
              />
            ) : modalState === "report" ? (
              <ReportContainer
                actId={activity.id ? activity.id : activity.postId}
                onGoToTicket={onGoToTicket}
                authorId={activity.authorUID}
                authorName={authorName}
                authorPhone={authorPhone}
                ticketOwnerId={ticketOwnerId}
              />
            ) : null

            // modalState === "revaluate" ? (
            //   <RevaluateContainer />
            // ) : null

            // (
            //   <ExpiredContainer isUserActivity={isUserActivity} />
            // )
          }
        </div>
      </CreateModal>
    </>
  );
};

export default ModerationModal;
