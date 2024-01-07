// import { useEventMembers } from "@hooks/community/useEventMembers";
import { Cohort, EventInterface } from "@models/Event/Event";
import Members from "@templates/community/Members/Members";
import TopHeader from "@templates/community/Thread/TopHeader";

interface Props {
  allEvents: EventInterface[];
  allEventCohorts: { [eId: string]: { [cId: string]: Cohort } };
  communityId: string;
  onGoBack: () => void;
  onProfileNameClick: (newId: string) => void;
}

const MemberContainer: React.FC<Props> = ({
  allEventCohorts,
  allEvents,
  onGoBack,
  onProfileNameClick,
  communityId,
}) => {
  return (
    <div className="pt-24">
      <div className="max-w-lg pb-2 md:hidden">
        <TopHeader onClick={onGoBack} />
      </div>
      <div className="">
        <Members
          allEvents={allEvents}
          onProfileNameClick={onProfileNameClick}
          allEventCohorts={allEventCohorts}
          communityId={communityId}
        />
      </div>
      <div className="h-48" />
    </div>
  );
};

export default MemberContainer;
