// import Button from "@components/button";
import { TextField } from "@mui/material";
import { ReviewMessage } from "@models/Activities/Activity";
import clsx from "clsx";
// import { GoalKPI } from "@models/Tasks/Task";
import AddTags from "./AddTags";
// import TaskNameDrop from "./TaskNameDrop";

interface Props {
  onUpdateScore: (points: number) => void;
  onUpdateReviewMessage: (msg: string) => void;
  //   onChangeReviewStatus: (msg: reviewStatus) => void;
  onChangeTags: (tag: string) => void;
  selectedDay?: number;

  // gameTask?: boolean;
  // targetValue?: number;
  // unit?: string;
  // onUpdateActivityValue: (reps: number, unit: string) => void;
  review: ReviewMessage;
  programDays?: number[];
  updateActivityTaskDayFunc: (newDay: number) => void;

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

const ReviewFormV2: React.FC<Props> = ({
  review,
  onUpdateReviewMessage,
  selectedDay,
  onChangeTags,
  onUpdateScore,
  programDays,
  updateActivityTaskDayFunc,
  // gameTask,
  // targetValue,
  // unit,
  // goalKPIs,
  // onUpdateActivityValue,
  //   updateNotify,
  //   notifyFlag,
  //   updateTaskId,
  //   onSelectName,
  //   date,
  //   setDate,
}) => {
  // console.log("p", programDays);
  return (
    <div>
      <div>
        <div className="pb-4">
          {/* <TaskNameDrop
            onSelectId={updateTaskId}
            onSelectName={onSelectName}
            selectedId={taskId}
          /> */}
        </div>

        <TextField
          style={{ width: "100%" }}
          placeholder="set fit points"
          type="number"
          label="Add Points"
          required
          variant="outlined"
          onChange={(newVal) => onUpdateScore(parseInt(newVal.target.value))}
          value={review.score ? Math.floor(review.score / 300) : 0}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className="py-4">
          <p className="font-medium pb-2">Select day of game</p>
          <div className="flex flex-wrap">
            {programDays &&
              programDays?.map((item) => {
                return (
                  <div
                    onClick={() => updateActivityTaskDayFunc(item)}
                    key={`elem-${item}`}
                    className={clsx(
                      selectedDay === item ? "border-green-500" : "",
                      "p-4 border cursor-pointer"
                    )}
                  >
                    <p
                      className={clsx(
                        selectedDay === item
                          ? "font-semibold text-black"
                          : "text-gray-700",
                        "text-base "
                      )}
                    >
                      {item}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

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

        <div className="pt-4">
          <TextField
            style={{ width: "100%" }}
            helperText="Message for user"
            placeholder="Optional"
            label="Add Message (Optional)"
            variant="outlined"
            onChange={(newVal) => onUpdateReviewMessage(newVal.target.value)}
            value={review.text}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="py-4">
          <AddTags selectedTags={review.tags} onTagSelect={onChangeTags} />
        </div>
      </div>
    </div>
  );
};

export default ReviewFormV2;
