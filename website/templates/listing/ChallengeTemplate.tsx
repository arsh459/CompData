import clsx from "clsx";
import { challengeModal } from "./ChallengeModals/ChallengeModals";
import { useRouter } from "next/router";
import { Cohort, EventInterface } from "@models/Event/Event";
import { useState } from "react";
import {
  challengePlaceholder,
  challengePlaceholderUser,
} from "@hooks/event/useEventHeadings";
import MediaHolder from "./MediaHolder/MediaHolder";
import HeaderWrapper from "./HeaderWrapper/HeaderWrapper";
import LeftContent from "./ContentWrapper/LeftContent";
import { UserInterface } from "@models/User/User";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import ChallengeBook from "./Book/ChallengeBook";
import {
  copyChallengeForCreator,
  saveCopiedChallenge,
} from "@models/Event/challengeInvite";
import { Post } from "@models/Posts/Post";
import ChallengeModals from "./ChallengeModals/ChallengeModals";
import ChallengeModal from "./BookingModal/ChallengeModal";
import { useJoinChallenge } from "@hooks/community/useJoinChallenge";
import CohortBookingModal from "./BookingModal/CohortBookingModal";
import BookV2 from "./Book/BookV2";
import { homeDomain } from "@constants/seo";
import { useChallengeSeriesOnly } from "@hooks/workouts/useChallengeSeriesOnly";

export const razorpay_key_id_front = "rzp_live_N8tAbOcFSLnajr";

interface challengeProps {
  selectedEvent: EventInterface;
  leader: LeaderBoard;
  editing: boolean;
  live?: boolean;
  // participatingCommunity?: string;
  selectedCohort?: Cohort;
  viewStyle?: "mobile" | "desktop";
  totalSold?: number;
  totalLeft?: number;
  cohortId: string;
  noHeader?: boolean;
  preview?: boolean;
  user?: UserInterface;
  setAuthIsVisible: () => void;
}

const headerItems: string[] = ["Prizes", "Participate", "How it works", "FAQ"];

const ChallengeTemplate: React.FC<challengeProps> = ({
  selectedEvent,
  cohortId,
  selectedCohort,
  preview,
  leader,
  noHeader,
  viewStyle,
  editing,
  setAuthIsVisible,
  user,
}) => {
  const [modalState, setModalState] = useState<challengeModal>("none");

  const { childEvents } = useJoinChallenge(selectedEvent.id);
  const { eventSeriesIds, eventSeries } = useChallengeSeriesOnly(
    selectedEvent.id
  );

  const onClick = (
    newSection?:
      | "name"
      | "description"
      | "media"
      | "cost"
      | "profile"
      | "schedule"
      | "cohorts"
  ) => {
    if (editing && newSection) {
    }
  };

  const router = useRouter();

  const onSubmit = async (post: Post) => {
    if (user?.uid && user?.userKey) {
      setModalState("loading");

      const copiedEvent = copyChallengeForCreator(
        selectedEvent,
        user?.uid,
        post.media,
        post.text
      );

      // save your challenge
      await saveCopiedChallenge(
        selectedEvent.ownerUID,
        copiedEvent,
        { ...post, eventId: copiedEvent.id },
        cohortId
      );

      // save id
      router.push(
        `https://${user.userKey}.${homeDomain}/?eventId=${copiedEvent.id}&nav=program`
      );
    }
  };

  const onStartTeamClick = () => {
    setModalState("new-creator");
  };

  const onBookModal = () => {
    // if (eventSeriesIds.length > 0 && eventSeries[0].cost) {
    //   setModalState("bookModal");
    // } else

    if (selectedEvent.cost) {
      router.push(`/checkout/${selectedEvent.eventKey}`);
    } else {
      setAuthIsVisible();
    }
  };

  // const onBook = () => {
  //   if (selectedEvent.cost) {
  //     router.push(`/checkout/${selectedEvent.eventKey}`);
  //   } else {
  //     setAuthIsVisible();
  //   }
  // };

  const onRegisterClick = () => {
    // go to team
    setModalState("team-select");
  };

  const onClose = () => setModalState("none");

  const onFreeClick = () => {
    setModalState("none");
    setAuthIsVisible();
  };

  // console.log("selectedEvent", selectedEvent.eventKey);

  return (
    <div className="bg-white rounded-lg">
      <ChallengeModals
        onPostClick={onSubmit}
        eventId={selectedEvent.id}
        communityKey={leader.userKey}
        cohortId={cohortId}
        authorName={user?.name}
        authorImg={user?.profileImage}
        authorUID={user?.uid}
        onClose={onClose}
        communityId={selectedEvent.ownerUID}
        modalState={modalState}
        childEvents={childEvents}
        onFreeClick={onFreeClick}
        eventSeries={eventSeries}
      />

      <div className="max-w-6xl mx-auto">
        <HeaderWrapper
          headerItems={headerItems}
          noHeader={noHeader}
          profileName={leader?.name}
          userKey={leader?.userKey}
        />
        {/* {preview ? null : ( */}
        <div id="media" onClick={() => onClick("media")}>
          {noHeader ? null : <div className="h-16" />}
          <MediaHolder preview={preview} media={selectedEvent.media} />
        </div>
        {/* )} */}

        <div className="flex justify-between pl-4 pr-4">
          <div
            className={clsx(
              preview
                ? "w-full lg:w-2/3 lg:pt-4"
                : "w-full md:w-2/3 pt-4 md:pt-4"
            )}
          >
            <LeftContent
              aboutCreator={leader?.bio}
              preview={preview}
              profileImg={leader?.profileImage}
              profileName={leader?.name}
              socialMediaIcons={{
                linkedIn: leader?.linkedInLink,
                facebook: leader?.facebookProfile,
                instagram: leader?.instagramLink,
                youtube: leader?.youtubeLink,
                external: leader?.externalLink,
              }}
              onBookModal={onBookModal}
              // participatingCommunity={participatingCommunity}
              userKey={leader?.userKey}
              eventSeriesIds={eventSeriesIds}
              onClick={onClick}
              selectedEvent={selectedEvent}
              // setSelectedUserKey={setSelectedUserKey}
              childEvents={childEvents}
              creativeList={
                selectedEvent.parentId
                  ? challengePlaceholderUser
                  : challengePlaceholder
              }
            />

            <div className="h-10" />
          </div>

          <div
            className={clsx(
              viewStyle === "mobile"
                ? "hidden"
                : preview
                ? "hidden lg:flex"
                : "hidden md:flex",
              "sticky h-full w-1/3 top-16 pt-6 pl-4 justify-end"
            )}
          >
            {selectedEvent.parentId ? (
              <CohortBookingModal
                cta="Join team"
                link={`/joinBoat/${leader.userKey}/${selectedEvent.eventKey}`}
                cohorts={[]}
                onClick={onBookModal}
                keyWord=""
                cost={selectedEvent.cost}
                currency={selectedEvent.currency}
              />
            ) : (
              <ChallengeModal
                cost={selectedEvent.cost}
                currency={selectedEvent.currency}
                registerBy={selectedEvent.eventStarts}
                isFinished={selectedEvent.state === "finished" ? true : false}
                // participating={participatingCommunity}
                rightOnClick={onRegisterClick}
                onStartTeamClick={onStartTeamClick}
                eventId={selectedEvent.id}
                // rightText={"Join a member"}
                leftText={"Join as coach"}
              />
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          viewStyle === "mobile" ? "" : preview ? "lg:hidden" : "md:hidden",
          "sticky bottom-0 left-0 right-0 z-50"
        )}
      >
        {selectedEvent.parentId ? (
          <BookV2
            price={selectedEvent.cost}
            registerBy={
              selectedEvent?.eventStarts
                ? new Date(selectedEvent?.eventStarts)
                : undefined
            }
            noPrice={true}
            viewStyle={viewStyle}
            totalSold={0}
            seatsLeft={0}
            soldOut={false}
            currency={selectedEvent.currency}
            link={`/joinBoat/${leader.userKey}/${selectedEvent.eventKey}`}
            cta="Join team"
            onClick={onBookModal}
            cohortSize={selectedCohort?.cohortSize}
            seatsBooked={selectedCohort?.seatsBooked}
          />
        ) : (
          <ChallengeBook
            registerBy={selectedEvent?.eventStarts}
            onClick={onRegisterClick}
            isFinished={selectedEvent.state === "finished" ? true : false}
            eventId={selectedEvent.id}
            // rightText="Join as member"
            leftText="Join as coach"
          />
        )}
      </div>
    </div>
  );
};

export default ChallengeTemplate;
