import { TaskDoneType } from "@hooks/community/useTaskDoneLists";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import clsx from "clsx";

interface Props {
  taskDoneLists?: TaskDoneType[];
  onNextTaskDone: () => {};
}

const RankingComponent: React.FC<Props> = ({
  taskDoneLists,
  onNextTaskDone,
}) => {
  const { targetRef } = useNextOnScroll(onNextTaskDone, true);
  // const { targetRef } = useNextOnScroll(() => {}, true);

  return (
    <div
      className={clsx(
        "bg-gradient-to-b from-[#E27B92] to-[#E9986B]",
        "rounded-2xl italic font-medium m-4"
      )}
    >
      <h2 className="iphoneX:text-xl font-bold text-white text-center p-4">
        Top Ranks for Task
      </h2>
      <div className="h-px bg-white" />
      <div className="max-h-60 overflow-y-scroll scrollbar-hide">
        {taskDoneLists?.map((item, index, arr) => (
          <div key={item.id}>
            <div className="flex py-4 text-sm iphoneX:text-base">
              <div className="flex-1 px-4">
                <h4 className="text-white flex items-center  line-clamp-1">
                  {`#${index + 1} ${item.userName}`}
                </h4>
                <p className="text-gray-100 text-[10px] iphoneX:text-xs">
                  {item.createdOnStamp}
                </p>
              </div>
              <div className="w-px bg-white" />
              <div className="flex-1 flex">
                <div className="flex-1 flex justify-center items-center">
                  <h4 className="text-white  text-center">
                    Lvl {item.userLvl ? item.userLvl : 0}
                  </h4>
                </div>
                <div className="w-px bg-white" />
                <div className="flex-1 flex justify-center items-center">
                  <h4 className="text-white  text-center">
                    {item.earnedFP} FP
                  </h4>
                </div>
              </div>
            </div>
            {index === arr.length - 1 ? null : (
              <div className="h-px bg-white" />
            )}
          </div>
        ))}
        <div ref={targetRef} className="h-px" />
      </div>
    </div>
  );
};

export default RankingComponent;
