import { eventVisibility } from "@hooks/community/useCommunityEvent";
// import { useUnlockedEvent } from "@hooks/useUnlockedEvent";
// import { Link } from "@mui/material";
import { Cohort, EventInterface } from "@models/Event/Event";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";
import { useState } from "react";
// import EventCircle from "./EventCircle";
// import EventCircleWrapper from "./EventCircleWrapper";
import EventSelectorModal from "./EventSelectorModal";

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
  isMember: boolean;
}

const EventDropdownV2: React.FC<Props> = ({
  selectedEvent,
  events,
  onClick,
  eventCohorts,
  setEventViewState,
  myUID,
  selectedCohortId,
  communityId,
  signedInUser,
  isMember,
}) => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const onClose = () => toggleOpen(false);
  const onOpen = () => toggleOpen(true);

  // const { enrolled } = useUnlockedEvent(
  //   signedInUser,
  //   selectedEvent?.id,
  //   communityId,
  //   selectedCohortId,
  //   selectedEvent?.cost,
  //   selectedEvent?.needsRegistration
  // );

  // useEffect(() => {
  //   if (enrolled && selectedEvent?.id) {
  //     setEventViewState("community");
  //   } else if (selectedEvent?.id) {
  //     setEventViewState("preview");
  //   }
  // }, [enrolled, selectedEvent?.id, setEventViewState]);

  const onEventClick = (newId: string, cohortId: string) => {
    onClick(newId, cohortId);
    toggleOpen(false);
  };

  return (
    <>
      <EventSelectorModal
        isOpen={isOpen}
        onBackdrop={onClose}
        onButtonPress={onClose}
        // setEventViewState={setEventViewState}
        onCloseModal={onClose}
        events={events}
        communityId={communityId}
        signedInUser={signedInUser}
        selectedCohortId={selectedCohortId}
        selectedEvent={selectedEvent}
        onEventClick={onEventClick}
      />
      <div className="bg-white rounded-lg my-2 md:my-0 md:ml-4 py-2 shadow-sm">
        <div className="px-4 flex items-center cursor-pointer" onClick={onOpen}>
          <img
            className="w-4 h-4 object-cover"
            src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png"
          />
          <div className="pl-2">
            <p className="text-gray-700 text-lg font-semibold underline">
              {selectedEvent?.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="bg-white rounded-lg my-2 md:my-0 md:ml-4 py-2 shadow-sm">
  //     <div className="flex overflow-x-auto scrollbar-hide p-2 pt-4 pl-4 space-x-2">
  //       {myUID === communityId ? (
  //         <Link href={`/dashboard`} target="_blank">
  //           <EventCircle
  //             selected={false}
  //             onClick={() => {}}
  //             eventName="Create your challenge"
  //             eventMedia={[
  //               {
  //                 path: "v1635421407/1607443586568_fgwx8m.jpg",
  //                 width: 200,
  //                 height: 200,
  //                 resource_type: "image",
  //                 format: "jpg",
  //               } as CloudinaryMedia,
  //             ]}
  //             enrolled={true}
  //             subtitle="Real time editor"
  //           />
  //         </Link>
  //       ) : null}
  //       {events.map((item) => {
  //         const cohortsForEvent = eventCohorts[item.id];
  //         // console.log("sel", item.name, item.id);

  //         if (cohortsForEvent && Object.keys(cohortsForEvent).length > 0) {
  //           return Object.keys(cohortsForEvent).map((cohortId) => {
  //             return (
  //               <div key={cohortId}>
  //                 <EventCircleWrapper
  //                   communityId={communityId}
  //                   item={item}
  //                   signedInUser={signedInUser}
  //                   selected={
  //                     selectedCohortId
  //                       ? item.id === selectedEvent?.id &&
  //                         cohortId === selectedCohortId
  //                       : item.id === selectedEvent?.id
  //                   }
  //                   onClick={onClick}
  //                   setEventViewState={setEventViewState}
  //                   subtitle={cohortsForEvent[cohortId].cohortName}
  //                   cohortId={cohortId}
  //                   signedInUID={myUID}
  //                 />
  //               </div>
  //             );
  //           });
  //         } else {
  //           return (
  //             <EventCircleWrapper
  //               communityId={communityId}
  //               key={item.id}
  //               item={item}
  //               setEventViewState={setEventViewState}
  //               signedInUser={signedInUser}
  //               selected={item.id === selectedEvent?.id}
  //               onClick={onClick}
  //               signedInUID={myUID}
  //             />
  //           );
  //         }
  //       })}
  //     </div>
  //   </div>
  // );
};

export default EventDropdownV2;
