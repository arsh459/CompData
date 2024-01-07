import { useBadgeDayTasks } from "../hooks/useBadgeDayTasks";
import TaskCardElement from "./TaskCardElement";

interface Props {
  badgeId: string;
  day: number;
  uid: string;
  slug?: string;
  isPro: boolean;
}

const DayHolder: React.FC<Props> = ({ badgeId, day, slug, uid, isPro }) => {
  const { tasks } = useBadgeDayTasks(badgeId, day);

  return (
    <div className=" text-white  ">
      <p className="p-4 px-0 text-xl font-nunitoSB">Sample Day {day + 1}</p>
      {tasks.map((item) => {
        return (
          <div key={item.id} className="w-full pb-4">
            <TaskCardElement
              item={item}
              uid={uid}
              slug={slug}
              freeTask={day < 1}
              isPro={isPro}
            />
          </div>
        );
      })}

      <div className="pb-8" />
    </div>
  );
};

export default DayHolder;
