// import { UserRank } from "@models/Activities/Activity";
import { useActivities } from "@hooks/activities/useActivities";
// import { useUserActivities } from "@hooks/activities/useUserActivities";
import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
import ActivityCard from "./ActivityCard";
// import UserRankCard from "./UserRankCard";

interface Props {
  inspectingUser: UserInterface;
  parentEvent: EventInterface;
}

const UserActivityDashboardTemplate: React.FC<Props> = ({
  inspectingUser,
  parentEvent,
}) => {
  const { activities } = useActivities(inspectingUser.uid);

  // console.log("act", activities);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <p className="text-2xl text-center font-semibold">{parentEvent.name}</p>
      <p className="text-2xl text-center text-gray-700">
        {inspectingUser.name}
      </p>

      <div className="flex flex-wrap pt-8">
        {activities.map((item) => {
          return (
            <div key={item.postId} className="m-4">
              <ActivityCard activity={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserActivityDashboardTemplate;
