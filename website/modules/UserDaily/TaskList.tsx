import { Activity } from "@models/Activities/Activity";

interface Props {
  activities: Activity[];
}

const TaskList: React.FC<Props> = ({ activities }) => {
  //   console.log(dts);

  return (
    <div>
      <p className="text-sm text-gray-700">Done Tasks</p>
      {activities.map((item) => {
        const fp = item.calories ? item.calories / 300 : 0;
        return (
          <div
            className="flex justify-between"
            key={item.id ? item.id : item.postId}
          >
            <p className="text-xs">{item.activityName}</p>
            <p className="text-xs text-green-500 pl-4">{fp} FP</p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
