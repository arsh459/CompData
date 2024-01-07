import { EventInterface } from "@models/Event/Event";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";

// import { useJoinStatus } from "@hooks/community/useJoinStatus";
// import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
// import { useCommunityParamsV2 } from "@hooks/community/v2/useCommunityParamsV2";
// import HeaderV2 from "@templates/community/Header/HeaderV2";
// import EventBrief from "@templates/community/Program/EventBrief/EventBrief";
// import LockedProgramV2 from "@templates/community/Program/Containers/LockedProgramV2";
// import Btn from "@components/button/Btn";
// import { useState } from "react";
// import HowToPlay from "@templates/community/Program/HowToPlay";
import HeaderV4 from "@templates/community/Header/HeaderV4";
import LockedProgramV3 from "@templates/community/Program/Containers/LockedProgramV3";
import { useCommunityParamsV3 } from "@hooks/community/v2/useCommunityParamsV3";
// import SelectTeam from "@templates/selectTeam/SelectTeam";

interface Props {
  leader: UserInterface;
  celebLeaderObj?: UserInterface;
  signedInUser?: UserInterface;
  selectedEvent: EventInterface;
  parentEvent: EventInterface | null;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  signOut: () => void;

  authRequest: (eventKey: string, eId: string) => void;
}

const TeamTemplateV2: React.FC<Props> = ({
  leader,
  signedInUser,
  selectedEvent,
  parentEvent,
  authRequest,
  authStatus,
  celebLeaderObj,
}) => {
  const { onGoBack, urlState, onQueryChange } = useCommunityParamsV3(
    selectedEvent.parentId
      ? parentEvent?.configuration?.starts
      : selectedEvent?.configuration?.starts,
    selectedEvent.parentId
      ? parentEvent?.configuration?.challengeLength
      : selectedEvent?.configuration?.challengeLength,
    selectedEvent.parentId
      ? parentEvent?.configuration?.sprints
      : selectedEvent?.configuration?.sprints,
    selectedEvent.parentId
      ? parentEvent?.configuration?.rounds
      : selectedEvent?.configuration?.rounds
  );

  const justAuthRequest = () => {
    authRequest(
      selectedEvent?.eventKey ? selectedEvent?.eventKey : "",
      selectedEvent?.id ? selectedEvent.id : ""
    );
  };

  return (
    <div className="max-w-md min-h-screen flex flex-col relative mx-auto">
      <HeaderV4
        onSignIn={justAuthRequest}
        onGoBack={onGoBack}
        signedInUser={signedInUser}
        authStatus={authStatus}
        tone={urlState.teamSelect ? "dark" : undefined}
        noSignIn={true}
      />

      <LockedProgramV3
        selectedEvent={selectedEvent}
        parentEvent={parentEvent}
        queryChange={onQueryChange}
        urlState={urlState}
        leader={celebLeaderObj ? celebLeaderObj : leader}
        paddingTop={false}
      />
    </div>
  );
};

export default TeamTemplateV2;
