import { Activity } from "@models/Activities/Activity";
import Task from "../TaskResults/Task";

interface Props {
  //   numTickets?: number;
  activities: Activity[];
  heading: string;
}

const ActivityCarousel: React.FC<Props> = ({
  heading,
  activities,
  //   numTickets,
}) => {
  return (
    <>
      <h1 className="text-3xl font-semibold pt-4">
        {heading} {activities.length > 1 ? `(${activities.length - 1})` : "(0)"}
      </h1>
      <div className="py-2 flex overflow-x-auto">
        {activities.map((item) => {
          return (
            <div
              // className="px-4 mr-4 py-4 border shadow-sm min-w-[240px]"
              key={item.id}
            >
              <Task noMinWidth={true} activity={item} onRefresh={() => {}} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ActivityCarousel;
