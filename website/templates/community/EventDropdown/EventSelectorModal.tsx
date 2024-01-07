import { EventInterface } from "@models/Event/Event";
import CreateModal from "../Program/CreateModal/CreateModal";
import TopClose from "../Program/Feed/TopClose";
import Divider from "@components/divider/Divider";
// import EventCircle from "./EventCircle";
import EventCircleWrapper from "./EventCircleWrapper";
import { UserInterface } from "@models/User/User";
// import { eventVisibility } from "@hooks/community/useCommunityEvent";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onBackdrop: () => void;
  onButtonPress: () => void;
  events: EventInterface[];
  signedInUser?: UserInterface;
  communityId: string;
  // setEventViewState: (newState: eventVisibility) => void;
  selectedCohortId: string;
  selectedEvent?: EventInterface;
  onEventClick: (newId: string, cohortId: string) => void;
}

const EventSelectorModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onBackdrop,
  onButtonPress,
  events,
  signedInUser,
  communityId,
  // setEventViewState,
  selectedCohortId,
  selectedEvent,
  onEventClick,
}) => {
  return (
    <CreateModal
      onBackdrop={onBackdrop}
      onButtonPress={onButtonPress}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
    >
      <div className="p-4">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onCloseModal} />
        </div>
        <div>
          <Divider />
        </div>
        <div className="py-2">
          <p className="text-base font-medium text-center text-gray-700">
            Programs
          </p>
        </div>
        {events.map((item) => {
          return (
            <div key={item.id} className="pb-4">
              <EventCircleWrapper
                communityId={communityId}
                item={item}
                signedInUser={signedInUser}
                subtitle=""
                signedInUID={signedInUser?.uid}
                // setEventViewState={setEventViewState}
                cohortId={selectedCohortId}
                selected={item.id === selectedEvent?.id}
                onClick={onEventClick}
              />
            </div>
          );
        })}
      </div>
    </CreateModal>
  );
};

export default EventSelectorModal;
