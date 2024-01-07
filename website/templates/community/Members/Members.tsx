import { useCommunityMembers } from "@hooks/community/useCommunityMembers";
import { Cohort, EventInterface } from "@models/Event/Event";
import Member from "./Member";
// import { getEventNames } from "./utils";

interface Props {
  communityId: string;
  allEvents: EventInterface[];
  onProfileNameClick: (uid: string) => void;
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  };
}

const Members: React.FC<Props> = ({
  communityId,
  onProfileNameClick,
  allEvents,
}) => {
  const { members } = useCommunityMembers(communityId);

  return (
    <div className="px-4 py-2">
      <div>
        <p className="text-4xl text-gray-700 font-semibold">{`Members ${
          members.length > 0 ? `(${members.length})` : ""
        }`}</p>
      </div>
      <div className="flex flex-wrap justify-evenly md:justify-start pt-8">
        {members.map((item) => {
          // const eventNames = getEventNames(allEvents, item.enrolledEvents);
          return (
            <div key={item.uid} className="pb-4 w-[140px]">
              <Member
                name={item.name}
                onImgClick={() => onProfileNameClick(item.uid)}
                tagline={item.tagline}
                enrolledEvents={[]}
                cohortName=""
                profileImage={item.profileImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Members;
