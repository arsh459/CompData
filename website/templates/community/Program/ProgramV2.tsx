import { postFilters } from "@hooks/community/usePostsV2";
// import { challengePlaceholder } from "@hooks/event/useEventHeadings";
// import { Link } from "@mui/material";
import { EventInterface, leaderboardKPIs } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { Post } from "@models/Posts/Post";
import { UserInterface } from "@models/User/User";
// import JoinTeamButton from "@templates/listing/Book/JoinTeamButton";
// import CBCWithDisclosure from "@templates/listing/CBCBrief/CBCWithDisclosure";
import { useState } from "react";
// import CreateButton from "./CreateModal/CreateButton";
// import FAQWrapperWithDisclosure from "./FAQWrapper/FAQWrapperWithDisclosure";
import FilterHolder from "./Filters/FilterHolder";
import MemberStrip from "./MemberStrip/MemberStrip";
import NextButton from "./NextButton";
// import PostCreator from "./Post/Post";
import PostPlaceholder from "./Post/PostPlaceholder";
// import PostWithReply from "./Post/PostWithReply";
// import PrizesWrapper from "./Prizes/PrizesWrapper";
import { getLeaderboardDescs } from "./utils/utils";
import HallOfFameWrapper from "./HallOfFame/HallOfFameWrapperLeader";
import GrowCommunity from "./GrowCommunity/GrowCommunity";
import { useRouter } from "next/router";
import { terraWidget_internalCall } from "server/terra/widget_local";
import GivePermissionsModal from "./WearableConnect/GivePermissionsModal";
// import DescriptionSection from "./DescriptionSection/DescriptionSection";
// import RedirectSection from "./RedirectSection/RedirectSection";
// import DescWithDisclosure from "./DescriptionSection/DescWithDisclosure";
import { UserRank } from "@models/Activities/Activity";
import {
  leaderboardWeekTypes,
  navLevels,
} from "@hooks/community/useCommunityParams";
import WorkoutSeriesHolder from "./WorkoutSeriesHolder/WorkoutSeriesHolder";
// import Hello from "./Hello/Hello";
import PostScreenshot from "./PostScreenshot/PostScreenshot";
// import BottomNavCom from "@templates/listing/Book/BottomNavCom";

interface Props {
  selectedEvent?: EventInterface;
  postsV2: Post[];
  leader: LeaderBoard;
  user?: UserInterface;
  communityId: string;
  selectedCohortId: string;
  setParentPostId: (newId: string) => void;
  joinURL: string;
  setAuthIsVisible: () => void;
  isMember: boolean;
  nextExists: boolean;
  onNext: () => void;
  postFilter: postFilters;
  setPostFilter: (newFilter: postFilters) => void;
  viewOnly?: boolean;
  parentEvent?: EventInterface;
  selectedLeaderboard: leaderboardKPIs;
  onLeaderboardChange: (newL: leaderboardKPIs) => void;
  myUserRank?: UserRank;
  savedList: string[];
  onNavChange: (navLevel: navLevels) => void;
  navState: navLevels;
  nowIndex: number;
  // onProfileNameClick: (uid: string) => void;
  leaderboardWeek?: leaderboardWeekTypes;
  onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
}

const ProgramV2: React.FC<Props> = ({
  user,
  communityId,
  navState,
  postsV2,
  selectedCohortId,
  leader,
  joinURL,
  setAuthIsVisible,
  setParentPostId,
  selectedEvent,
  isMember,
  nextExists,
  onNext,
  postFilter,
  setPostFilter,
  viewOnly,
  parentEvent,
  selectedLeaderboard,
  onLeaderboardChange,
  myUserRank,
  // onProfileNameClick,
  savedList,
  onNavChange,
  nowIndex,
  leaderboardWeek,
  onLeaderboardWeekChange,
}) => {
  // const [postRequest] = useState<number>(0);
  const [_, setLoading] = useState<boolean>(false);
  const [isVisble, setIsVisible] = useState<boolean>(false);

  const onClose = () => setIsVisible(false);
  // const onOpen = () => setIsVisible(true);

  const router = useRouter();

  const onNewPostRequest = () => {
    // console.log("onNewPostRequest");

    if (user?.uid && selectedEvent?.id && isMember) {
      // console.log("compose");
      onNavChange("compose");
      // setPostRequest((prev) => prev + 1);
    } else {
      setAuthIsVisible();
    }
  };

  // const buttonType = getBottomButtonType(
  //   leader.uid,
  //   user?.uid,
  //   user?.enrolledEvents,
  //   selectedEvent?.id,
  //   user?.terraUser
  // );

  // const handleBottomButtonClick = async () => {
  //   if (buttonType === "join") {
  //     setAuthIsVisible();
  //   } else if (buttonType === "wearable") {
  //     onOpen();
  //   }
  // };

  const onTerraWidget = async () => {
    setIsVisible(false);
    if (user?.uid && leader.userKey) {
      setLoading(true);

      try {
        const res = await terraWidget_internalCall(user?.uid, leader.userKey);

        if (res && res.url) {
          router.push(res.url);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // console.log("s", selectedEvent?.parentId);

  return (
    <>
      <GivePermissionsModal
        isOpen={isVisble}
        onButtonPress={onTerraWidget}
        onCloseModal={onClose}
        onBackDrop={onClose}
      />

      <div className="px-4 pt-2 pb-4">
        {/* <div className="pb-2">
          <Hello
            eventName={selectedEvent?.name}
            eventDescription={selectedEvent?.description}
            name={user?.name}
            signedIn={user?.uid ? true : false}
          />
        </div> */}
        <WorkoutSeriesHolder
          eventId={selectedEvent?.id}
          onNavChange={onNavChange}
          seriesAccess={selectedEvent?.seriesAccess}
          onProfileNameClick={() => {}}
          onPostCreate={onNewPostRequest}
          challengeLength={
            parentEvent?.challengeLength ? parentEvent.challengeLength : 0
          }
          communityKey={leader.userKey ? leader.userKey : ""}
          communityId={leader.uid}
          parentId={parentEvent?.id ? parentEvent.id : ""}
          isOwner={leader.uid === user?.uid}
          uid={user?.uid}
          name={user?.name}
          challengeStarts={parentEvent?.eventStarts}
          eventName={selectedEvent?.name}
          enrolledSeries={user?.enrolledCourses}
        />
      </div>

      <div className="relative px-2 scrollbar-hide md:px-4">
        {leader.uid === user?.uid &&
        selectedEvent?.id &&
        selectedEvent.eventKey ? (
          <div className="pb-2">
            <GrowCommunity
              eventId={selectedEvent?.id}
              eventKey={selectedEvent?.eventKey}
            />
          </div>
        ) : null}

        {/* {leader.userKey ? (
        <div>
          <WearableConnect
            terraUser={user?.terraUser}
            uid={user?.uid}
            leaderKey={leader.userKey}
          />
        </div>
      ) : null} */}

        {/* <div className="px-4 pt-2 pb-4 md:px-0">
          <DescWithDisclosure
            preview={true}
            desc={selectedEvent?.description}
          />
          <CBCWithDisclosure
            creativeList={challengePlaceholder}
            preview={true}
          />

          {parentEvent ? (
            <FAQWrapperWithDisclosure
              selectedEvent={parentEvent}
              preview={true}
            />
          ) : null}
        </div> */}

        <div className="pt-4 pb-8">
          <PostScreenshot postWorkout={onNewPostRequest} />
        </div>

        {/* <div className="">
          <RedirectSection
            myUserRank={myUserRank}
            savedList={savedList}
            wearableConnected={user?.terraUser ? true : false}
            onNavChange={onNavChange}
            buttonType={buttonType}
            onNewPostRequest={onNewPostRequest}
            onTerraWidget={onTerraWidget}
            onSeeAll={() => onNavChange("me")}
            nowIndex={nowIndex}
          />
        </div> */}

        {/* {parentEvent?.programDetails &&
        parentEvent?.state !== "finished" &&
        parentEvent?.eventType === "challenge" ? (
          <div className="p-4 pt-0 md:p-0 md:pb-8">
            <div className="pt-2">
              <PrizesWrapper
                heading="🏆 Weekly Fitness Prizes 🏆"
                prizes={parentEvent?.programDetails}
                canSubmit={
                  selectedEvent?.id &&
                  user?.enrolledEvents?.includes(selectedEvent.id)
                    ? true
                    : false
                }
                setPostRequest={onNewPostRequest}
              />
            </div>
          </div>
        ) : null} */}

        {user && selectedEvent?.id ? (
          <div className="pb-2">
            {/* <PostCreator
              eventId={selectedEvent?.id}
              communityId={leader.uid}
              authorName={user.name ? user.name : ""}
              cohortId={selectedCohortId}
              authourUID={user.uid}
              authorImg={user.profileImage}
              postRequest={postRequest}
              navState={navState}
              onNavChange={onNavChange}
            /> */}
          </div>
        ) : null}

        {selectedEvent?.id && !viewOnly ? (
          <div className="pb-2">
            <MemberStrip
              nbMembers={selectedEvent.students}
              leaderboardWeek={leaderboardWeek}
              eventKey={selectedEvent.eventKey ? selectedEvent.eventKey : ""}
              onLeaderboardWeekChange={onLeaderboardWeekChange}
              eventType={selectedEvent.eventType}
              isAdmin={user?.role ? true : false}
              communityId={leader.uid}
              state={parentEvent?.state}
              eventId={selectedEvent?.id}
              isMember={isMember}
              parentId={selectedEvent?.parentId}
              myUserRank={myUserRank}
              cohortId={selectedCohortId}
              terraUser={user?.terraUser}
              uid={user?.uid}
              leaderKey={leader.userKey}
              challengeLength={parentEvent?.challengeLength}
              after={parentEvent?.eventStarts}
              leaderDescription={getLeaderboardDescs(parentEvent?.leaderboards)}
              selectedLeaderboard={selectedLeaderboard}
              onLeaderboardChange={onLeaderboardChange}
              onProfileNameClick={() => {}}
              savedList={savedList}
            />
          </div>
        ) : null}

        <div className="">
          <HallOfFameWrapper
            uid={leader.uid}
            eventId={parentEvent ? undefined : selectedEvent?.id}
            live={parentEvent && parentEvent.state === "active" ? true : false}
          />
        </div>
        {/* <div className="pt-2 pb-2">
          <div className="flex overflow-x-auto scrollbar-hide no-scrollbar">
            {["s", "ss", "ddd", "dddd"].map((item) => {
              return (
                <div key={item} className="w-1/2 flex-none border bg-red-50">
                  {item}
                </div>
              );
            })}
          </div>
        </div> */}

        <div className="pt-2 pb-2">
          <FilterHolder
            onPostRequest={onNewPostRequest}
            onClick={setPostFilter}
            selected={postFilter}
          />
        </div>

        {selectedEvent?.id &&
          postsV2.map((item) => {
            return (
              <div key={item.id} className="pb-4">
                {/* <PostWithReply
                  hideNextButton={true}
                  prizes={parentEvent?.programDetails}
                  showReplyCTA={true}
                  authorName={item.creatorName}
                  // onProfileNameClick={onProfileNameClick}
                  authorImage={item.creatorImg}
                  viewerUID={user?.uid}
                  isAdmin={user?.role === "admin"}
                  viewerImg={user?.profileImage}
                  viewerName={user?.name}
                  authorUID={item.creatorId}
                  joinURL={joinURL}
                  communityId={communityId}
                  selectedCohortId={selectedCohortId}
                  currentPost={item}
                  rounded={true}
                  dontGetReplies={true}
                  pin={true}
                  eventId={selectedEvent?.id}
                  parentEventId={selectedEvent.parentId}
                  viewLevel="session"
                  numInitialElements={1}
                  setAuthIsVisible={setAuthIsVisible}
                  isMember={isMember}
                  onClick={() => setParentPostId(item.id)}
                /> */}
              </div>
            );
          })}

        {nextExists ? (
          <div className="w-full pb-4 bg-white md:pb-0">
            <NextButton onClick={onNext} />
          </div>
        ) : null}

        {/* {buttonType === "none" && !viewOnly ? (
          <div className="fixed z-20 bottom-4 right-4 md:hidden">
            <CreateButton onClick={onNewPostRequest} />
          </div>
        ) : buttonType !== "none" ? (
          <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <BottomNavCom selectedNav={navState} onNavChange={onNavChange} />
           
          </div>
        ) : null} */}

        {postsV2.length === 0 ? <PostPlaceholder /> : null}

        <div className="h-20" />
      </div>
    </>
  );
};

export default ProgramV2;
