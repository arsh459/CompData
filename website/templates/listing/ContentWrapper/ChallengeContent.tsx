import { EventInterface } from "@models/Event/Event";
import GoalWrapper from "@templates/community/Program/GoalWrapper/GoalWrapper";
import JoinWrapper from "@templates/community/Program/JoinWrapper/JoinWrapper";
import PrizesWrapper from "@templates/community/Program/Prizes/PrizesWrapper";
import { ListItem } from "../NumberedList/NumberedList";
import Divider from "@components/divider/Divider";
import CBCWithDisclosure from "../CBCBrief/CBCWithDisclosure";
import FAQWrapperWithDisclosure from "@templates/community/Program/FAQWrapper/FAQWrapperWithDisclosure";
import WhyParticipate from "../WhyParticipate/WhyParticipate";
import SeriesPreview from "./SeriesPreview";

interface Props {
  selectedEvent: EventInterface;
  creativeList: ListItem[];
  leaderKey: string;
  childEvents: EventInterface[];
  onBookModal: () => void;
  eventSeriesIds: string[];
  // setSelectedUserKey: (key: string) => void;
  // preview?: boolean;
}

const ChallengeContent: React.FC<Props> = ({
  selectedEvent,
  creativeList,
  // participatingCommunity,
  childEvents,
  onBookModal,
  eventSeriesIds,
  leaderKey,
  // setSelectedUserKey,
  // preview,
}) => {
  return (
    <div>
      <div>
        {selectedEvent.programDetails ? (
          <PrizesWrapper
            prizes={selectedEvent.programDetails}
            heading="🏆 Weekly Fitness Prizes 🏆"
            setPostRequest={() => {}}
          />
        ) : null}
      </div>
      <div>
        <GoalWrapper goal={selectedEvent.courseGoal} />
      </div>

      {!selectedEvent.parentId ? (
        <div className="pt-8">
          <WhyParticipate />
        </div>
      ) : (
        <SeriesPreview
          onPreviewClick={onBookModal}
          eventSeriesIds={eventSeriesIds}
          leaderKey={leaderKey}
          eventKey={selectedEvent.eventKey ? selectedEvent.eventKey : ""}
          // eventId={selectedEvent.id}
        />
      )}

      <JoinWrapper
        // participatingCommunity={participatingCommunity}
        // setSelectedUserKey={setSelectedUserKey}
        childEvents={childEvents}
      />

      {childEvents.length > 0 ? (
        <div className="pt-8 pb-2">
          <Divider />
        </div>
      ) : null}

      <CBCWithDisclosure
        // participatingCommunity={
        // participatingCommunity && preview ? participatingCommunity : ""
        // }
        preview={false}
        creativeList={creativeList}
      />

      <FAQWrapperWithDisclosure
        selectedEvent={selectedEvent}
        preview={false}
        // participatingCommunity={
        // participatingCommunity && preview ? participatingCommunity : ""
        // }
      />
    </div>
  );
};

export default ChallengeContent;
