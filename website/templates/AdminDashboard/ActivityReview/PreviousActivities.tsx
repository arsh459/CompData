import { useParentActivities } from "@hooks/tasks/useParentActivities";
import { usePreviousActivitiesV2 } from "@hooks/tasks/usePreviousActivitiesV2";
// import { gameTypes } from "@models/Event/Event";
import ActivityCarousel from "./ActivityCarousel";

interface Props {
  //   numTickets?: number;
  taskId?: string;
  parentIds?: string[];
  uid: string;
  // teamId?: string;
  // gameType?: gameTypes;
}

const PreviousActivities: React.FC<Props> = ({
  taskId,
  uid,
  parentIds,
  // gameType,
  //   numTickets,
}) => {
  const parent = useParentActivities(true, parentIds, uid);
  const { userActivities } = usePreviousActivitiesV2(true, taskId, uid);

  return (
    <>
      <ActivityCarousel activities={userActivities} heading="Last 7 days" />

      <div className="pt-4">
        <ActivityCarousel
          activities={parent.userActivities}
          heading="Parent tasks"
        />
      </div>
    </>
  );
};

export default PreviousActivities;
