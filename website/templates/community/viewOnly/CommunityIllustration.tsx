import {
  eventVisibility,
  useCommunityEventCache,
} from "@hooks/community/useCommunityEventCache";
import { EventInterface, EventKPIs } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import Header from "@templates/community/Header/Header";
import EventDropdown from "../EventDropdown/EventDropdown";
import { navElements_display } from "../constants/constants";
import { useState } from "react";
import ProfileWrapper from "../ProfileWrapper/ProfileWrapper";
import ProgramWrapper from "../ProgramWrapper/ProgramWrapper";
import ListingWrapper from "@templates/listing/ListingWrapper";
import { listingPagePropsV1 } from "@constants/landing/live";

interface Props {
  leader: LeaderBoard;
  initialEventId: string;
  allEvents: EventInterface[];
  eventKPIs?: EventKPIs;
  setAuthIsVisible: () => void;
}

const CommunityIllustration: React.FC<Props> = ({
  leader,
  initialEventId,
  allEvents,
  setAuthIsVisible,
  // eventKPIs,
}) => {
  const [eventViewState, setEventViewState] =
    useState<eventVisibility>("community");
  const [selEventId, setSelEventId] = useState<string>(initialEventId);
  const { selectedEvent } = useCommunityEventCache(allEvents, selEventId);

  const onToggleEvent = (newId: string) => {
    setSelEventId(newId);
  };

  return (
    <div className="max-w-7xl mx-auto relative bg-gray-50 rounded-lg">
      <div className="rounded-lg absolute top-0 left-0 right-0 bg-white z-50 ">
        <Header
          signedInUserImage={listingPagePropsV1.profileImg}
          signedInUserKey="sample"
          onNavChange={() => {}}
          onSignOut={() => {}}
          authStatus="PENDING"
          headerItems={[]}
          onSignIn={() => {}}
          name={leader.name}
          userKey={leader.userKey}
        />
      </div>
      <div className="md:grid md:grid-cols-4 ">
        <div className="md:pl-2">
          <ProfileWrapper
            leader={leader}
            parentPostId=""
            dummy={true}
            navElements={navElements_display}
            nav={"program"}
            isAdmin={true}
            onNavChange={() => {}}
            height="85vh"
          />
        </div>

        <div className="md:col-span-3 md:overflow-y-auto">
          <div className="md:h-20" />
          <>
            <div className="pt-0 md:mt-0">
              <EventDropdown
                onClick={onToggleEvent}
                events={allEvents}
                eventCohorts={{}}
                selectedEvent={selectedEvent}
                setEventViewState={setEventViewState}
                // enrolledEvents={enrolledEvents}
                // enrolledCohorts={enrolledCohorts}
                // myUID={signedInUser?.uid}
                communityId={leader.uid}
                selectedCohortId={""}
              />
            </div>
            <div className="md:p-4">
              {eventViewState === "community" ? (
                <ProgramWrapper
                  selectedLeaderboard="calories"
                  leaderboardWeek="overall"
                  onLeaderboardWeekChange={() => {}}
                  onProfileNameClick={() => {}}
                  onLeaderboardChange={() => {}}
                  leader={leader}
                  setParentPostId={() => {}}
                  selectedEvent={selectedEvent}
                  joinURL={"https://zoom.us"}
                  setAuthIsVisible={setAuthIsVisible}
                  navState={"program"}
                  selectedCohortId={""}
                  onNewPost={() => {}}
                  isMember={false}
                  numClaps={45}
                  numCheckins={34}
                  leaderboard={true}
                  viewOnly={true}
                  savedList={[]}
                  nowIndex={0}
                  onNavChange={() => {}}
                />
              ) : selectedEvent && eventViewState === "preview" ? (
                <ListingWrapper
                  event={selectedEvent}
                  preview={true}
                  leader={leader}
                  cohorts={[]}
                />
              ) : null}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default CommunityIllustration;
