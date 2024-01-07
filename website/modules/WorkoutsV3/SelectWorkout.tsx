// import { labelType } from "@models/Tasks/Task";
// import {
//   runningThumbnail,
//   cyclingThumbnail,
//   calesthenicsThumbnail,
//   yogaThumbnail,
//   beginnerThumbnail,
//   strengthThumbnail,
// } from "@constants/taskThumbnail";
// import { useTasks } from "@hooks/tasks/useTasks";
import Header from "./Header";
import CYWBtn from "./CYWBtn";
import { useGameTaskSummaries } from "@hooks/tasks/useGameTaskSummaries";
import { labelType } from "@models/Tasks/Task";
import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";
import { baseImageKit } from "@constants/icons/iconURLs";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import FinaleCard from "@modules/FinaleCard/FinaleCard";
import { RoundObject } from "@models/Event/Event";
// import { Link } from "@mui/material";

// const thumbnailList: { [task in labelType]: string } = {
//   running: runningThumbnail,
//   cycling: cyclingThumbnail,
//   calesthenics: calesthenicsThumbnail,
//   yoga: yogaThumbnail,
//   strength: strengthThumbnail,
//   beginner: beginnerThumbnail,
// };

interface Props {
  gotoComponent: () => void;
  onSummaryClick: (summaryType: labelType) => void;
  onBack: () => void;
  gameId: string;
  rounds?: RoundObject[];
  gameStarts?: number;
}

const SelectWorkout: React.FC<Props> = ({
  gotoComponent,
  onSummaryClick,
  onBack,
  gameId,
  rounds,
  gameStarts,
}) => {
  // console.log("gameId", gameId);
  const { taskSummaries } = useGameTaskSummaries(gameId);

  // console.log("taskSumm", rounds, gameStarts);

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <Header
        onBack={onBack}
        title="Choose Your Tasks"
        headingCenter={true}
        color="#335E7D"
        classStr="py-8"
      />

      <CYWBtn gotoComponent={gotoComponent} />

      <div className="w-full py-4">
        <LineDivider />
      </div>

      <div className="grid gap-4 grid-cols-2">
        {taskSummaries.map((task) => {
          if (task.name) {
            return (
              <div
                key={task.summaryId}
                className="cursor-pointer relative"
                onClick={() => {
                  onSummaryClick(task.name as labelType);
                  weEventTrack("startWorkout_selectWorkoutTagClick", {
                    tagName: task.name,
                  });
                }}
              >
                <img
                  className="w-full object-cover rounded-2xl"
                  src={`${baseImageKit}/tr:w-200,h-300/${task.thumbnail}`}
                  // src={thumbnailList[task.labels]}
                  alt="thumbnail"
                />

                {task.subheading ? null : (
                  <p className="capitalize italic absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
                    {task.name}
                  </p>
                )}
                {/* </Link> */}
              </div>
            );
          }
        })}
      </div>
      {rounds && gameStarts ? (
        <div className="pt-4">
          <FinaleCard
            onClick={() => onSummaryClick("finale")}
            rounds={rounds}
            challengeStarts={gameStarts}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SelectWorkout;
