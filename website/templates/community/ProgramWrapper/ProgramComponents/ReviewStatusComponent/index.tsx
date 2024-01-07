import {
  Activity,
  ReviewMessage,
  reviewStatus,
} from "@models/Activities/Activity";
import DetailsModalView1 from "./DetailsModalView1";
import DetailsModalView2 from "./DetailsModalView2";
import { useState } from "react";
import { getReason } from "@templates/community/NewCommunitySection/utils";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { fetchTask } from "./utils";
import { onSeePoints } from "@models/Activities/reportUtils";
import TicketModal from "../TicketModal";
import clsx from "clsx";

export type ModalData = {
  head?: string;
  subHead?: { head: string; text: string };
  text?: string;
  loadInd?: boolean;
  viewBtn?: boolean;
  tryBtn?: boolean;
  tryBtnText?: string;
  reportBtn?: boolean;
  reportBtnText?: string;
  viewBtnFunc?: () => void;
  tryBtnFunc?: () => void;
  tryBtnLink?: string;
  reportBtnFunc?: () => void;
};

interface Props {
  // isUserActivity: boolean;
  signedInUID: string;
  reviewStatus?: reviewStatus;
  activeMessage?: ReviewMessage;

  // activityName: string;
  fitPoints: number;
  pointsSeen?: boolean;
  totalFitPoints?: number;

  tryAgainURL: string;
  taskId?: string;

  authorId: string;
  activityId: string;
  activity: Activity;
  teamKey: string;
  eventKey: string;

  isPrivatePost?: boolean;
}

const ReviewStatusComponent: React.FC<Props> = ({
  // isUserActivity,
  reviewStatus,
  // activityName,
  pointsSeen,
  fitPoints,
  activeMessage,
  tryAgainURL,
  totalFitPoints,
  taskId,
  authorId,
  activityId,
  activity,
  signedInUID,
  teamKey,
  eventKey,
  isPrivatePost,
}) => {
  const [isOpenView1, setIsOpenView1] = useState<boolean>(false);
  const [isOpenView2, setIsOpenView2] = useState<boolean>(false);
  const [ticketModal, showTicketModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({});

  const dontfetchRemoteTask = fetchTask(
    pointsSeen,
    totalFitPoints,
    reviewStatus
  );

  const { task } = useWorkoutTask(taskId, dontfetchRemoteTask);
  const isViewerAuthor = signedInUID === activity.authorUID;
  const areTicketsPending = activity.reviewRequestedBy?.includes(signedInUID);

  // console.log("task", task?.name, task?.fitPoints, dontfetchRemoteTask);

  const onCloseReasonModal = async () => {
    // console.log("here");
    if (typeof pointsSeen === "boolean" && pointsSeen === false) {
      setIsOpenView1(false);
      await onSeePoints(authorId, activityId);
    } else {
      setIsOpenView1(false);
    }
  };

  const handleInReviewClick = () => {
    setModalData({
      loadInd: true,
      text: `Post In Review. We review within 20 minutes if posted between 9:00am - 1am`,
    });
    setIsOpenView1(true);
  };

  const handViewPointsClick = () => {
    setModalData({
      head: "Congratulations!",
      subHead: {
        head: "Your result",
        text: `${fitPoints}/${
          totalFitPoints ? totalFitPoints : task?.fitPoints
        } Fitpoints`,
      },
      text: "Incase you want to Revaluate the points you can click on i and then on post options to revaluate the points with in 24 hrs of the post.",
    });
    setIsOpenView1(true);
    // code update review status to SAVED
  };

  const handTryAgainClick = () => {
    const tryAgainFunc = () => {
      // console.log("Try Again");
      // code for try again
    };

    const veiwReasonFunc = () => {
      setIsOpenView2(false);
      setTimeout(() => {
        setModalData({
          subHead: { head: "Reason", text: getReason(activeMessage) },
          text: "Dont give up! You have another chance. Submit in 24 hours to get full points",
          tryBtn: true,
          tryBtnFunc: tryAgainFunc,
          tryBtnLink: tryAgainURL,
          reportBtn: true,
          reportBtnFunc: () => {},
        });
        setIsOpenView1(true);
      }, 500);
    };

    setModalData({
      head: "Post Rejected",
      text: "This message is only visible to you. Users see post as is",
      viewBtn: true,
      tryBtn: true,
      tryBtnLink: tryAgainURL,
      viewBtnFunc: veiwReasonFunc,
      tryBtnFunc: tryAgainFunc,
    });
    setIsOpenView2(true);
  };

  const handDiscardedClick = () => {
    const veiwReasonFunc = () => {
      setIsOpenView2(false);
      setTimeout(() => {
        setModalData({
          subHead: { head: "Reason", text: getReason(activeMessage) },
          text: "Thank you. Unfortunately, we will not be able to review this post to keep the game fair",
          reportBtn: true,
          reportBtnFunc: () => {},
        });
        setIsOpenView1(true);
      }, 500);
    };

    setModalData({
      head: "Post Rejected",
      text: "Do not worry this post will be only visible to you.",
      viewBtn: true,
      viewBtnFunc: veiwReasonFunc,
    });
    setIsOpenView2(true);
  };

  const handleTicket = () => {
    // console.log("hERE");
    showTicketModal(true);
  };
  const onCloseTicket = () => showTicketModal(false);
  // const onCloseTicketCTA = async () => {
  //   showTicketModal(false);
  //   if (activity) {
  //     await clearTicket(activity?.authorUID, activityId, authorId);
  //   }
  // };

  const handleNeedData = () => {
    const veiwReasonFunc = () => {
      setIsOpenView2(false);
      setTimeout(() => {
        setModalData({
          subHead: { head: "Reason", text: getReason(activeMessage) },
          text: "We need some more information to review your post. Submit within 24 hours to get full points",
          tryBtn: true,
          tryBtnText: "Edit Post",
          tryBtnLink: tryAgainURL,
          tryBtnFunc: () => {},
          reportBtn: true,
          reportBtnFunc: () => {},
        });
        setIsOpenView1(true);
      }, 500);
    };

    setModalData({
      head: "Need Information",
      text: "Do not worry this message is only visible to you.",
      viewBtn: true,
      viewBtnFunc: veiwReasonFunc,
      tryBtn: true,
      tryBtnText: "Edit Post",
      tryBtnLink: tryAgainURL,
      tryBtnFunc: () => {},
    });
    setIsOpenView2(true);
  };

  // console.log(
  //   activity.authorUID === "lHhuSVKMAZbj86xg8m6ubZqKdUj2" ? activity : null,
  //   areTicketsPending,
  //   isViewerAuthor
  // );

  // console.log("task", task?.fitPoints);

  // reviewStatus for activity & general score is updated

  return (
    <>
      <DetailsModalView1
        isOpen={isOpenView1}
        onCloseModal={onCloseReasonModal}
        modalData={modalData}
      />
      <DetailsModalView2
        isOpen={isOpenView2}
        onCloseModal={() => setIsOpenView2(false)}
        modalData={modalData}
      />
      {activity ? (
        <TicketModal
          isOpen={ticketModal}
          onClose={onCloseTicket}
          signedInUserId={signedInUID}
          ticket={activity}
          teamKey={teamKey}
          eventKey={eventKey}
          // onClearTicket={onCloseTicketCTA}
        />
      ) : null}
      {areTicketsPending && !isViewerAuthor ? (
        <div
          className={clsx(
            isPrivatePost
              ? ""
              : "absolute left-2.5 iphoneX:left-4 bottom-2.5 iphoneX:bottom-4 z-20"
          )}
        >
          <button
            className="text-[#203C51] bg-[#F5F5F5] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
            onClick={handleTicket}
          >
            View Ticket
          </button>
        </div>
      ) : !isViewerAuthor ? (
        <>
          {reviewStatus === "REVIEWED" ||
          reviewStatus === "SAVED" ||
          reviewStatus === "REVIEW_REQUEST" ? (
            <div
              className={clsx(
                isPrivatePost
                  ? ""
                  : "absolute left-2.5 iphoneX:left-4 bottom-2.5 iphoneX:bottom-4 z-20",
                "text-white text-lg iphoneX:text-xl italic font-bold flex items-center pointer-events-none"
              )}
            >
              <img
                src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454`}
                alt="media title"
                className="w-4 iphoneX:w-6"
              />
              <p className="pl-2">
                {fitPoints}/{task?.fitPoints} FP
              </p>
            </div>
          ) : reviewStatus === "PENDING" || reviewStatus === "IN_REVIEW" ? (
            <div
              className={clsx(
                isPrivatePost
                  ? ""
                  : "absolute left-2.5 iphoneX:left-4 bottom-2.5 iphoneX:bottom-4 z-20"
              )}
            >
              <button
                className="text-[#203C51] bg-[#F5F5F5] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
                onClick={handleInReviewClick}
              >
                In Review
              </button>
            </div>
          ) : null}
        </>
      ) : isViewerAuthor ? (
        <div
          className={clsx(
            isPrivatePost
              ? ""
              : "absolute left-2.5 iphoneX:left-4 bottom-2.5 iphoneX:bottom-4 z-20"
          )}
        >
          {areTicketsPending && reviewStatus === "REVIEW_REQUEST" ? (
            <button
              className="text-[#203C51] bg-[#F5F5F5] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
              onClick={handleTicket}
            >
              View Ticket
            </button>
          ) : (reviewStatus === "REVIEWED" ||
              reviewStatus === "SAVED" ||
              reviewStatus === "REVIEW_REQUEST") &&
            typeof pointsSeen === "boolean" &&
            pointsSeen === false ? (
            <button
              className="text-white bg-[#5DAC64] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
              onClick={handViewPointsClick}
            >
              View Points
            </button>
          ) : reviewStatus === "REVIEWED" ||
            reviewStatus === "SAVED" ||
            reviewStatus === "REVIEW_REQUEST" ? (
            <div className="text-white text-2xl italic font-bold flex items-center pointer-events-none">
              <img
                src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454`}
                alt="media title"
              />
              <p className="pl-2">{fitPoints} FP</p>
            </div>
          ) : reviewStatus === "PENDING" || reviewStatus === "IN_REVIEW" ? (
            <button
              className="text-[#203C51] bg-[#F5F5F5] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
              onClick={handleInReviewClick}
            >
              In Review
            </button>
          ) : reviewStatus === "NEED_MORE_DATA" ? (
            <button
              className="text-white bg-[#FD6F6F] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
              onClick={handleNeedData}
            >
              Need info
            </button>
          ) : reviewStatus === "TRY_AGAIN" ? (
            <button
              className="text-white bg-[#FD6F6F] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
              onClick={handTryAgainClick}
            >
              Try Again
            </button>
          ) : reviewStatus === "DISCARDED" ? (
            <button
              className="text-white bg-[#FD6F6F] text-xs iphoneX:text-sm px-2.5 iphoneX:px-4 py-1 iphoneX:py-1.5 rounded-full"
              onClick={handDiscardedClick}
            >
              Rejected
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default ReviewStatusComponent;
