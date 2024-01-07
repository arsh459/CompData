import { usePrizesOfCommunity } from "@hooks/activities/usePrizesOfCommunity.ts";
// import { usePrizeSummary } from "@hooks/activities/usePrizeSummary";
// import PrizeBadge from "@templates/community/PersonalKPIs/PrizeBadge";
// import HallOfFameContent from "./HallOfFameContent";
import HallOfFameContentV2 from "./HallOfFameContentV2";

interface Props {
  uid?: string;
  eventId?: string;
  live: boolean;
}

const HallOfFame: React.FC<Props> = ({ uid, live }) => {
  // const { prizes, prizeStatus } = usePrizeSummary(uid);
  const { prizes, nextExists, onNext } = usePrizesOfCommunity(uid);

  return (
    <div>
      {prizes.length > 0 ? (
        <HallOfFameContentV2
          prizes={prizes}
          nextExists={nextExists}
          onNext={onNext}
          live={live}
        />
      ) : null}
    </div>
  );
};

export default HallOfFame;
