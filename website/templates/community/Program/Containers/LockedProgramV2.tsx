import { useJoinChallenge } from "@hooks/community/useJoinChallenge";
import TransformationsSection from "@templates/community/Transformations/TransformationsSection";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import FAQWrapper from "../FAQWrapper/FAQWrapper";
import GoalWrapperV2 from "../GoalWrapper/GoalWrapperV2";
import ChildEventHolderV2 from "../JoinWrapper/ChildEventHolderV2";
import PrizesWrapperV2 from "../Prizes/PrizeWrapperV2";
import RulesContainer from "./RulesContainer";

interface Props {
  goal?: string;
  parentId?: string;
  eventId: string;
  prizes?: ListItem[];
  faq?: ListItem[];
  isAdmin: boolean;
  eventKey?: string;
  leaderboardWeek?: string;
  leaderboardMonth?: string;
}

const LockedProgramV2: React.FC<Props> = ({
  goal,
  prizes,
  parentId,
  eventId,
  faq,
  eventKey,
  isAdmin,
}) => {
  const { childEvents, nextExists, onNext } = useJoinChallenge(
    parentId ? parentId : eventId,
    6
  );

  return (
    <div className="px-4 py-2">
      {goal ? <GoalWrapperV2 text={goal} /> : null}
      {prizes ? (
        <div className="pt-4">
          <PrizesWrapperV2
            heading="Prizes"
            prizes={prizes}
            canSubmit={false}
            headingSmall={true}
            setPostRequest={() => {}}
          />
        </div>
      ) : null}
      {!parentId ? (
        <div className="pt-4">
          <ChildEventHolderV2
            nextExists={nextExists}
            onNext={onNext}
            childEvents={childEvents}
          />
        </div>
      ) : null}

      <div className="pt-4">
        <TransformationsSection
          gameId={parentId ? parentId : eventId}
          isAdmin={isAdmin}
          eventKey={eventKey}
        />
      </div>

      <div className="pt-4">
        <RulesContainer gameId={parentId ? parentId : eventId} />
      </div>

      <div className="pt-4">
        <FAQWrapper faq={faq} />
      </div>

      <div className="h-24" />
    </div>
  );
};

export default LockedProgramV2;
