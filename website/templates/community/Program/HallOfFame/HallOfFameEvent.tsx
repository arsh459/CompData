// import { usePrizeSummary } from "@hooks/activities/usePrizeSummary";
import { usePrizeSummaryForEvent } from "@hooks/activities/usePrizeSummaryForEvent";
// import PrizeBadge from "@templates/community/PersonalKPIs/PrizeBadge";
import HallOfFameContent from "./HallOfFameContent";

interface Props {
  eventId?: string;
}

const HallOfFameEvent: React.FC<Props> = ({ eventId }) => {
  const { prizes, prizeStatus } = usePrizeSummaryForEvent(eventId);

  return (
    <div>
      {prizeStatus ? (
        <HallOfFameContent
          numConsistent={prizes?.numConsistent}
          numTrees={prizes?.numTrees}
          totalCalories={prizes?.totalCalories}
        />
      ) : null}
    </div>
  );
};

export default HallOfFameEvent;
