import { UserRank } from "@models/Activities/Activity";
import { EventInterface } from "@models/Event/Event";
// import UserRankCard from "./UserRankCard";

interface Props {
  userRanks: UserRank[];
  parentEvent: EventInterface;
}

const ActivityDashboardTemplate: React.FC<Props> = ({
  userRanks,
  parentEvent,
}) => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <p className="text-2xl text-center font-semibold">{parentEvent.name}</p>
      <div className="flex flex-wrap pt-8">
        {userRanks.map((item) => {
          return (
            <div key={item.uid} className="m-4">
              {/* <UserRankCard userRank={item} /> */}
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityDashboardTemplate;
