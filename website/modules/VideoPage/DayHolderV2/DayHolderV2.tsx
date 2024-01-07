import { useBadgeDayTasks } from "../hooks/useBadgeDayTasks";
// import TaskCardElementV2 from "./TaskCardElementV2";

interface Props {
  badgeId: string;
  day: number;
  uid: string;
  slug?: string;
}

const DayHolderV2: React.FC<Props> = ({ badgeId, day, slug, uid }) => {
  const { tasks } = useBadgeDayTasks(badgeId, day);
  // console.log({ tasks, day, badgeId }, "tasks, day, badgeId");

  return (
    <div className=" text-white  ">
      {/* <p className="p-4 px-0 text-xl font-nunitoSB">Day {day + 1}</p> */}
      {tasks.map((item) => {
        return (
          <div key={item.id} className="w-full ">
            {/* <TaskCardElementV2 item={item} uid={uid} slug={slug} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default DayHolderV2;
