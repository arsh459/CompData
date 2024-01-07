// import Button from "@components/button";
// import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
// import { useCurrentEvent } from "@hooks/editEvent/useCurrentEvent";
// import { useGameGoals } from "@hooks/goals/useGameGoals";
import { TextField } from "@mui/material";
import { ReviewMessage } from "@models/Activities/Activity";
import { SystemKPIs } from "@models/Tasks/SystemKPIs";
import { GoalKPI } from "@models/Tasks/Task";
// import TaskNameDrop from "@templates/community/Program/Post/Modals/TaskNameDrop";
// import { GoalKPI } from "@models/Tasks/Task";
// import AddTags from "./AddTags";
// import TaskNameDrop from "./TaskNameDrop";

interface Props {
  //   onUpdateScore: (points: number) => void;
  //   onUpdateReviewMessage: (msg: string) => void;
  //   onChangeReviewStatus: (msg: reviewStatus) => void;
  //   onChangeTags: (tag: string) => void;

  // gameTask?: boolean;
  // targetValue?: number;
  // unit?: string;
  onUpdateActivityValue: (reps: number, unit: SystemKPIs) => void;
  taskKPIs?: GoalKPI[];

  review: ReviewMessage;
  // gameId: string;
  // goalKPIs?: GoalKPI[];
  //   setFitPoints: (points: number) => void;
  //   distance?: number;
  //   time?: number;

  //   setDistance: (dist: number) => void;
  //   setTime: (time: number) => void;
  //   notifyFlag: boolean;
  //   updateNotify: (newFlag: boolean) => void;

  //   onSelectName: (name: string) => void;
  //   updateTaskId: (tId: string) => void;
  //   date: Date | null | undefined;
  //   setDate: (newDate: Date | null) => void;
}

// interface GoalKPIWithTaskId extends GoalKPI {
//   taskId: string;
// }

const GameKPIForm: React.FC<Props> = ({
  review,
  // gameId,
  taskKPIs,
  //   onUpdateReviewMessage,
  //   onChangeReviewStatus,
  //   onChangeTags,
  //   onUpdateScore,
  // gameTask,
  // targetValue,
  // unit,
  // goalKPIs,
  onUpdateActivityValue,
  //   updateNotify,
  //   notifyFlag,
  //   updateTaskId,
  //   onSelectName,
  //   date,
  //   setDate,
}) => {
  // const { selectedEvent } = useCommunityEvent(gameId);
  // const { goals } = useGameGoals(selectedEvent?.configuration?.goals);

  // const kpisList: GoalKPIWithTaskId[] = [];
  // const kpis = goals.reduce((acc, item) => {
  //   const kpisInt = item.goalKPIs;
  //   const taskId = item.id;
  //   if (kpisInt) {
  //     for (const kp of kpisInt) {
  //       acc.push({ ...kp, taskId: taskId });
  //     }
  //   }

  //   return acc;
  // }, kpisList);

  // console.log("r", review);

  return (
    <div>
      <p className="text-lg font-bold text-center pb-2">KPI for tracking</p>
      <div className="flex flex-col">
        {taskKPIs &&
          taskKPIs.map((item) => {
            return (
              <div className="w-full" key={item.systemKPI}>
                <div className="pb-4">
                  <p className="text-base pb-2 font-medium text-gray-700">
                    {item.systemKPI}: {item.targetVal}
                  </p>
                  <TextField
                    style={{ width: "100%" }}
                    placeholder="Enter number"
                    type="number"
                    label={item.systemKPI}
                    required
                    variant="outlined"
                    onChange={(newVal) =>
                      onUpdateActivityValue(
                        parseInt(newVal.target.value),
                        item.systemKPI
                      )
                    }
                    value={
                      review.goalScores && review.goalScores[item.systemKPI]
                        ? review.goalScores[item.systemKPI]
                        : 0
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
            );
          })}
        {/* {goalKPIs && goalKPIs.length && gameTask
          ? goalKPIs.map((item) => {
              return (
                <div key={item.unitLabel}>
                  <div className="pt-2">
                    <p className="text-lg font-semibold text-gray-700">
                      Target example: {item.targetVal}
                      {item.unitLabel}
                    </p>
                    <TextField
                      style={{ width: "100%" }}
                      placeholder="Enter number"
                      type="number"
                      label={item.unitLabel}
                      required
                      variant="outlined"
                      onChange={(newVal) =>
                        onUpdateActivityValue(
                          parseInt(newVal.target.value),
                          item.unitLabel
                        )
                      }
                      value={
                        review.goalScores && review.goalScores[item.unitLabel]
                          ? review.goalScores[item.unitLabel]
                          : 0
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
              );
            })
          : null} */}
      </div>
    </div>
  );
};

export default GameKPIForm;
