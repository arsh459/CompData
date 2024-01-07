import { eventVisibility } from "@hooks/community/useCommunityEvent";
import { Link } from "@mui/material";
import { Cohort, EventInterface } from "@models/Event/Event";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";
import EventCircle from "./EventCircle";
// import EventCircleWrapper from "./EventCircleWrapper";
import EventCircleWrapperV1 from "./EventCircleWrapperV1";

interface Props {
  events: EventInterface[];
  selectedEvent?: EventInterface;
  onClick: (newId: string, cohortId: string) => void;
  setEventViewState: (newState: eventVisibility) => void;
  eventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  };
  myUID?: string;
  selectedCohortId: string;
  communityId: string;
  signedInUser?: UserInterface;
}

const EventDropdown: React.FC<Props> = ({
  selectedEvent,
  events,
  onClick,
  eventCohorts,
  setEventViewState,
  myUID,
  selectedCohortId,
  communityId,
  signedInUser,
}) => {
  return (
    <div className="bg-white rounded-lg my-2 md:my-0 md:ml-4 py-2 shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide p-2 pt-4 pl-4 space-x-2">
        {myUID === communityId ? (
          <Link href={`/dashboard`} target="_blank">
            <EventCircle
              selected={false}
              onClick={() => {}}
              eventName="Create your challenge"
              eventMedia={[
                {
                  path: "v1635421407/1607443586568_fgwx8m.jpg",
                  public_id: "v1635421407/1607443586568_fgwx8m",
                  width: 200,
                  height: 200,
                  resource_type: "image",
                  format: "jpg",
                } as CloudinaryMedia,
              ]}
              enrolled={true}
              subtitle="Real time editor"
            />
          </Link>
        ) : null}
        {events.map((item) => {
          const cohortsForEvent = eventCohorts[item.id];
          // console.log("sel", item.name, item.id);

          if (cohortsForEvent && Object.keys(cohortsForEvent).length > 0) {
            return Object.keys(cohortsForEvent).map((cohortId) => {
              // console.log("cohortId", cohortId, myUID === item.ownerUID);
              // console.log(
              //   "here",
              //   item.name,
              //   item.id,
              //   selectedEvent?.id,
              //   item.id === selectedEvent?.id,
              //   cohortId === selectedCohortId
              // );
              return (
                <div key={cohortId}>
                  <EventCircleWrapperV1
                    communityId={communityId}
                    item={item}
                    // enrolled={
                    //   (enrolledEvents[item.id] && enrolledCohorts[cohortId]) ||
                    //   myUID === item.ownerUID
                    // }
                    signedInUser={signedInUser}
                    selected={
                      selectedCohortId
                        ? item.id === selectedEvent?.id &&
                          cohortId === selectedCohortId
                        : item.id === selectedEvent?.id
                    }
                    onClick={onClick}
                    setEventViewState={setEventViewState}
                    subtitle={cohortsForEvent[cohortId].cohortName}
                    cohortId={cohortId}
                    signedInUID={myUID}
                  />
                </div>
              );
            });
          } else {
            return (
              <EventCircleWrapperV1
                communityId={communityId}
                key={item.id}
                item={item}
                setEventViewState={setEventViewState}
                signedInUser={signedInUser}
                // enrolled={enrolledEvents[item.id] || myUID === item.ownerUID}
                selected={item.id === selectedEvent?.id}
                onClick={onClick}
                signedInUID={myUID}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default EventDropdown;
