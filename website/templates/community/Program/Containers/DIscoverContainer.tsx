// import { useEventMembers } from "@hooks/community/useEventMembers";
// import { Cohort, EventInterface } from "@models/Event/Event";
import DiscoverChallenges from "@templates/community/DiscoverChallenges/DiscoverChallenges";
// import Members from "@templates/community/Members/Members";
import TopHeader from "@templates/community/Thread/TopHeader";

interface Props {
  onGoBack: () => void;
}

const DiscoverContainer: React.FC<Props> = ({ onGoBack }) => {
  return (
    <div className="pt-24">
      <div className="max-w-lg pb-2 md:hidden">
        <TopHeader onClick={onGoBack} />
      </div>
      <div className="">
        <DiscoverChallenges />
      </div>
      <div className="h-48" />
    </div>
  );
};

export default DiscoverContainer;
