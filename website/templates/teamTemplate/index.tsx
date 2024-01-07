// import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
// import { useCommunityParams } from "@hooks/community/useCommunityParams";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
// import Script from "next/script";
import { useJoinStatus } from "@hooks/community/useJoinStatus";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useCommunityParamsV2 } from "@hooks/community/v2/useCommunityParamsV2";
import HeaderV2 from "@templates/community/Header/HeaderV2";
import EventBrief from "@templates/community/Program/EventBrief/EventBrief";
import LockedProgramV2 from "@templates/community/Program/Containers/LockedProgramV2";
// import SelectTeam from "@templates/selectTeam/SelectTeam";
// import { mainCTAClick } from "@analytics/click/wrappers";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  selectedEvent: EventInterface;
  parentEvent: EventInterface | null;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  signOut: () => void;

  authRequest: (eventKey: string, eId: string) => void;
}

const TeamTemplate: React.FC<Props> = ({
  leader,
  signedInUser,
  selectedEvent,
  parentEvent,
  // setAuthIsVisible,
  // setNewPost,
  authRequest,
  authStatus,
  // signOut,
}) => {
  const {
    // selectedCohortId,

    // onNavChange,

    onGoBack,

    // onProfileNameClick,
  } = useCommunityParamsV2(
    parentEvent?.configuration?.starts,
    parentEvent?.configuration?.challengeLength,
    parentEvent?.configuration?.sprints
  );

  // const { selectedEvent } = useCommunityEvent(selectedEventId);
  // const parentEventObj = useCommunityEvent(selectedEvent?.parentId);

  // const onSignOut = () => {
  //   onNavChange("program");
  //   signOut();
  // };

  // console.log("selectedEvent", selectedEvent?.id);

  // const joinURL = getJoinURL(allEventCohorts, selectedEvent, selectedCohortId);

  const justAuthRequest = () => {
    authRequest(
      selectedEvent?.eventKey ? selectedEvent?.eventKey : "",
      selectedEvent?.id ? selectedEvent.id : ""
    );
  };

  const { memberStatus } = useJoinStatus(
    selectedEvent,
    signedInUser,
    undefined,
    authStatus
    // selectedCohortId
  );

  // console.log("nav", memberStatus);
  // console.log("signed", signedInUser.role);
  // console.log("me", memberStatus, parentEvent);
  // console.log("authStatus:", authStatus);
  // console.log("user UID", signedInUser?.uid, signedInUser?.role);
  // console.log("selectedEventID", selectedEvent.eventStarts, memberStatus);
  // console.log("event Owner UID", selectedEvent?.ownerUID);
  // console.log("UserEnrolled events", signedInUser?.enrolledEvents);

  // console.log("sel", selectedEvent?.eventType, selectedEvent?.parentId);

  return (
    <div className="max-w-xl relative mx-auto ">
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}

      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="bg-gray-100 top-0 w-full z-50 left-0 right-0 fixed">
          <HeaderV2
            onSignIn={justAuthRequest}
            onGoBack={onGoBack}
            signedInUserName={signedInUser?.name}
            uid={signedInUser?.uid}
            authStatus={authStatus}
            signedInUserImage={signedInUser?.profileImage}
            signedInUserKey={signedInUser?.userKey}
          />
        </div>

        <div className="h-20" />

        {/* <SelectTeam
          parentId={parentEvent?.id}
          parentKey={parentEvent?.eventKey}
        /> */}

        <>
          <div className="px-4 pt-4">
            <EventBrief
              eventName={selectedEvent?.name}
              eventDescription={selectedEvent?.description}
              creatorName={leader.name}
              creatorKey={leader.userKey}
              creatorUID={leader.uid}
              // onProfilePress={() => onProfileNameClick(leader.uid)}
            />
          </div>
        </>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2
          registerBy={
            parentEvent?.eventStarts && memberStatus === "FAILED"
              ? new Date(parentEvent.eventStarts)
              : selectedEvent?.eventStarts && memberStatus === "FAILED"
              ? new Date(selectedEvent.eventStarts)
              : undefined
          }
          cta={
            memberStatus === "SUCCESS" && selectedEvent.parentId
              ? "Go To Team"
              : memberStatus === "SUCCESS"
              ? "Go To Team"
              : memberStatus === "FAILED" && selectedEvent.parentId
              ? "Join Team"
              : memberStatus === "FAILED" && !selectedEvent.parentId
              ? "Start Team"
              : ""
          }
          link={
            memberStatus === "FAILED"
              ? `/joinBoatV2/${leader.userKey}/${selectedEvent.eventKey}`
              : memberStatus === "SUCCESS"
              ? `/teams`
              : ""
          }
          onClick={() => {
            // mainCTAClick(
            //   memberStatus === "SUCCESS"
            //     ? "go_to_team"
            //     : memberStatus === "FAILED" && selectedEvent.parentId
            //     ? "join_team"
            //     : memberStatus === "FAILED" && !selectedEvent.parentId
            //     ? "start_team"
            //     : ""
            // );
          }}
        />
      </div>

      <LockedProgramV2
        parentId={parentEvent?.id}
        eventId={selectedEvent.id}
        faq={parentEvent?.faq ? parentEvent.faq : selectedEvent.faq}
        prizes={
          parentEvent?.programDetails
            ? parentEvent.programDetails
            : selectedEvent.programDetails
        }
        isAdmin={signedInUser?.role ? true : false}
        goal={selectedEvent.courseGoal}
        eventKey={selectedEvent.eventKey}
      />
    </div>
  );
};

export default TeamTemplate;
