// import { postFilters } from "@hooks/community/usePostsV2";
// import { challengePlaceholder } from "@hooks/event/useEventHeadings";
// import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { Post } from "@models/Posts/Post";
import { UserInterface } from "@models/User/User";
// import JoinTeamButton from "@templates/listing/Book/JoinTeamButton";
// import CBCWithDisclosure from "@templates/listing/CBCBrief/CBCWithDisclosure";
// import { useState } from "react";
// import CreateButton from "./CreateModal/CreateButton";
// import FAQWrapperWithDisclosure from "./FAQWrapper/FAQWrapperWithDisclosure";
// import FilterHolder from "./Filters/FilterHolder";
// import MemberStrip from "./MemberStrip/MemberStrip";
import NextButton from "./NextButton";
// import PostCreator from "./Post/Post";
// import PostPlaceholder from "./Post/PostPlaceholder";
// import PostWithReply from "./Post/PostWithReply";
// import PrizesWrapper from "./Prizes/PrizesWrapper";
// import { getLeaderboardDescs } from "./utils/utils";
// import HallOfFameWrapper from "./HallOfFame/HallOfFameWrapperLeader";
// import GrowCommunity from "./GrowCommunity/GrowCommunity";
// import { useRouter } from "next/router";
// import { terraWidget_internalCall } from "server/terra/widget_local";
// import GivePermissionsModal from "./WearableConnect/GivePermissionsModal";
// import DescriptionSection from "./DescriptionSection/DescriptionSection";
// import RedirectSection from "./RedirectSection/RedirectSection";
// import DescWithDisclosure from "./DescriptionSection/DescWithDisclosure";
// import { UserRank } from "@models/Activities/Activity";
// import {
//   leaderboardWeekTypes,
//   // navLevels,
// } from "@hooks/community/useCommunityParams";
// import WorkoutSeriesHolder from "./WorkoutSeriesHolder/WorkoutSeriesHolder";
// import Hello from "./Hello/Hello";
// import PostScreenshot from "./PostScreenshot/PostScreenshot";
// import MemberStripV2 from "./MemberStrip/MemberStripV2";
import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";
// import PostCreatorV2 from "./Post/PostsV2";
import { generalClickEvent } from "@analytics/click/generalClick";
// import BottomNavCom from "@templates/listing/Book/BottomNavCom";

interface Props {
  selectedEvent?: EventInterface;
  postsV2: Post[];
  leader: LeaderBoard;
  user?: UserInterface;
  communityId: string;
  selectedCohortId: string;
  setParentPostId: (newId: string, eventId: string) => void;
  // joinURL: string;
  setAuthIsVisible: () => void;
  isMember: boolean;
  nextExists: boolean;
  onNext: () => void;
  // postFilter: postFilters;
  // setPostFilter: (newFilter: postFilters) => void;
  // viewOnly?: boolean;
  parentEvent?: EventInterface;
  // selectedLeaderboard: leaderboardKPIs;
  // onLeaderboardChange: (newL: leaderboardKPIs) => void;
  // myUserRank?: UserRank;
  // savedList: string[];
  onNavChange: (navLevel: navLevelsV2) => void;
  navState: navLevelsV2;
  // newPosts: number;
  // onLoadFirst: () => void;
  // nowIndex: number;
  // onProfileNameClick: (uid: string) => void;
  // leaderboardWeek?: leaderboardWeekTypes;
  // onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
}

const ProgramV3: React.FC<Props> = ({
  user,
  communityId,
  navState,
  postsV2,
  selectedCohortId,
  leader,
  setAuthIsVisible,
  setParentPostId,
  selectedEvent,
  isMember,
  nextExists,
  onNext,
  parentEvent,
  onNavChange,
}) => {
  // const [postRequest] = useState<number>(0);
  // const [_, setLoading] = useState<boolean>(false);
  // const [isVisble, setIsVisible] = useState<boolean>(false);

  // const onClose = () => setIsVisible(false);
  // const onOpen = () => setIsVisible(true);

  // const router = useRouter();

  const onNewPostRequest = () => {
    // console.log("onNewPostRequest");

    if (user?.uid && selectedEvent?.id && isMember) {
      // console.log("compose");
      onNavChange("compose");

      generalClickEvent("new_post", {});
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

  // const onTerraWidget = async () => {
  //   setIsVisible(false);
  //   if (user?.uid && leader.userKey) {
  //     setLoading(true);

  //     try {
  //       const res = await terraWidget_internalCall(user?.uid, leader.userKey);

  //       if (res && res.url) {
  //         router.push(res.url);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   }
  // };

  // console.log("postsV2", postsV2);

  return (
    <>
      <div className="relative px-2 scrollbar-hide md:px-4">
        {user && selectedEvent?.id && parentEvent?.id ? (
          <div className="">
            {/* <PostCreatorV2
              eventId={selectedEvent?.id}
              gameId={parentEvent?.id}
              communityId={leader.uid}
              authorName={user.name ? user.name : ""}
              cohortId={selectedCohortId}
              authourUID={user.uid}
              authorImg={user.profileImage}
              postRequest={postRequest}
              navState={navState}
              onNavChange={onNavChange}
              // isMember={isMember}
            /> */}
          </div>
        ) : null}

        {/* {newPosts ? (
          <div className="py-2">
            <div
              onClick={onLoadFirst}
              className="bg-white border border-blue px-4 py-2 shadow-sm"
            >
              <p className="text-center text-blue-500 font-semibold">
                New Posts in community
              </p>
            </div>
          </div>
        ) : null} */}

        {selectedEvent?.id &&
          postsV2.map((item, index) => {
            return (
              <div key={`${item.id}-${index}`} className="pb-4">
                {/* <PostWithReply
                  hideNextButton={true}
                  prizes={parentEvent?.programDetails}
                  showReplyCTA={true}
                  authorName={item.creatorName}
                  authorImage={item.creatorImg}
                  viewerUID={user?.uid}
                  isAdmin={user?.role === "admin"}
                  viewerImg={user?.profileImage}
                  viewerName={user?.name}
                  authorUID={item.creatorId}
                  joinURL={""}
                  communityId={communityId}
                  selectedCohortId={selectedCohortId}
                  currentPost={item}
                  rounded={true}
                  dontGetReplies={true}
                  pin={true}
                  eventId={item.eventId}
                  parentEventId={selectedEvent.parentId}
                  viewLevel="session"
                  numInitialElements={1}
                  setAuthIsVisible={setAuthIsVisible}
                  isMember={isMember}
                  onClick={() => {
                    setParentPostId(item.id, item.eventId);
                    generalClickEvent("post_click", {});
                  }}
                /> */}
              </div>
            );
          })}

        {nextExists ? (
          <div className="w-full pb-4 bg-white md:pb-0">
            <NextButton onClick={onNext} />
          </div>
        ) : null}

        <div className="fixed bottom-24 right-4 z-50">
          <div
            onClick={onNewPostRequest}
            className="w-16 h-16 bg-blue-400 cursor-pointer rounded-full shadow-sm flex justify-center items-center"
          >
            <img
              className="w-8 h-8 object-cover"
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik03OC44MzMzMywxNC4zMzMzM3Y2NC41aC02NC41djE0LjMzMzMzaDY0LjV2NjQuNWgxNC4zMzMzM3YtNjQuNWg2NC41di0xNC4zMzMzM2gtNjQuNXYtNjQuNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            />
          </div>
        </div>

        <div className="h-20" />
      </div>
    </>
  );
};

export default ProgramV3;
