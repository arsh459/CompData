import { Cohort, EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import ChallengeTemplate from "@templates/listing/ChallengeTemplate";
import ListingWrapper from "@templates/listing/ListingWrapper";
import { getEventCohortsFromObj } from "../utils/utils";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  allEvents: EventInterface[];
  selectedEvent: EventInterface;
  allEventCohorts: { [eId: string]: { [cId: string]: Cohort } };
  selectedCohortId: string;
  newAuthRequest: () => void;
}

const LockedProgram: React.FC<Props> = ({
  leader,
  signedInUser,
  allEvents,
  selectedEvent,
  allEventCohorts,
  selectedCohortId,
  newAuthRequest,
}) => {
  return (
    <>
      {allEvents.length > 0 && selectedEvent?.eventType === "challenge" ? (
        <div className="md:pl-4 md:pt-2">
          <ChallengeTemplate
            selectedEvent={selectedEvent}
            leader={leader}
            editing={false}
            cohortId={selectedCohortId}
            live={true}
            selectedCohort={
              allEventCohorts[selectedEvent.id]
                ? allEventCohorts[selectedEvent.id][selectedCohortId]
                : undefined
            }
            noHeader={true}
            preview={true}
            user={signedInUser}
            setAuthIsVisible={newAuthRequest}
          />
        </div>
      ) : selectedEvent?.eventType === "course" ? (
        <ListingWrapper
          event={selectedEvent}
          preview={true}
          leader={leader}
          cohorts={getEventCohortsFromObj(selectedEvent.id, allEventCohorts)}
        />
      ) : null}
    </>
  );
};

export default LockedProgram;
