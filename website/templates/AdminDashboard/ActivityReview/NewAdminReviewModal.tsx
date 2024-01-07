import Button from "@components/button";
import { useNewAdminReview } from "@hooks/admin/useNewAdminReview";
import {
  Activity,
  ReviewMessage,
  reviewStatus,
} from "@models/Activities/Activity";
import {
  onSaveNewReviewToAct,
  updateActivityTask,
  updateActivityTaskDay,
} from "@models/Activities/createUtils";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import LiveSelector from "@templates/community/Program/Post/LiveSelector";
import { useEffect, useState } from "react";
import TaskSearch from "../FilterModal/TaskModal";
import GameKPIForm from "./GameKPIForm";
import ReviewFormV2 from "./ReviewFormV2";
import ReviewStateForm from "./ReviewState";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  user: UserInterface;
  editingReview?: ReviewMessage;
  editFlag?: boolean;
  activity: Activity;
  task?: Task;
}

const NewAdminReviewModal: React.FC<Props> = ({
  isVisible,
  onClose,
  user,
  editFlag,
  editingReview,
  activity,
  task,
}) => {
  const [visibleForm, setVisibleForm] = useState<
    "TASK_CHANGE" | "REVIEW" | "TIME_SELECT" | "REVIEW_STATE" | "GOAL_SECTION"
  >("TASK_CHANGE");

  useEffect(() => {
    if (isVisible) {
      setVisibleForm("TASK_CHANGE");
    }
  }, [isVisible]);

  const {
    newReview,
    // onChangeReviewStatus,
    onChangeTags,
    onUpdateScore,
    onUpdateReviewMessage,
    onUpdateTaskId,
    onUpdateTime,
    onUpdateActivityValue,
    // onUpdateTaskDay,
  } = useNewAdminReview(user, editingReview, editFlag);
  console.log("newReview", newReview);

  const getNewTask = (task?: Task) => {
    if (task) {
      // console.log("task", task);
      updateActivityTask(activity, task.id, task.name).then(() => {
        onUpdateTaskId(task.id);
        onNext();
      });
    }
  };

  const updateActivityTaskDayFunc = (taskDay: number) => {
    if (typeof taskDay === "number") {
      // console.log("task", task);
      updateActivityTaskDay(activity, taskDay).then(() => {});
    }
  };

  const onNext = () => {
    if (visibleForm === "TASK_CHANGE") {
      setVisibleForm("TIME_SELECT");
    } else if (visibleForm === "TIME_SELECT") {
      setVisibleForm("REVIEW");
    } else if (visibleForm === "REVIEW") {
      setVisibleForm("GOAL_SECTION");
    } else if (visibleForm === "GOAL_SECTION") {
      setVisibleForm("REVIEW_STATE");
    } else {
      onClose();
    }
  };

  const onBack = () => {
    if (visibleForm === "TASK_CHANGE") {
      onClose();
    } else if (visibleForm === "TIME_SELECT") {
      setVisibleForm("TASK_CHANGE");
    } else if (visibleForm === "REVIEW") {
      setVisibleForm("TIME_SELECT");
    } else if (visibleForm === "GOAL_SECTION") {
      setVisibleForm("REVIEW");
    } else if (visibleForm === "REVIEW_STATE") {
      setVisibleForm("GOAL_SECTION");
    }
  };

  // console.log("activity", activity);

  const onComplete = async (state: reviewStatus, notify: boolean) => {
    if (newReview && activity.id && task) {
      // console.log("state", state);
      await onSaveNewReviewToAct(
        activity.id,
        activity.taskId,
        activity.authorUID,
        newReview,
        state,
        notify,
        // task,
        activity
      );
      onClose();
    }
  };

  return (
    <CreateModal
      heading=""
      isOpen={isVisible}
      onCloseModal={onClose}
      onBackdrop={onClose}
      onButtonPress={onClose}
    >
      <div className="p-4">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onClose} />
        </div>
        <div>
          {visibleForm === "TASK_CHANGE" ? (
            <TaskSearch
              taskId={task?.id}
              taskName={task?.name}
              onClose={() => {}}
              onOverrideSelect={getNewTask}
              allTasksHidden={true}
            />
          ) : visibleForm === "REVIEW" && newReview ? (
            <ReviewFormV2
              review={newReview}
              onChangeTags={onChangeTags}
              onUpdateReviewMessage={onUpdateReviewMessage}
              onUpdateScore={onUpdateScore}
              programDays={task?.programDays}
              selectedDay={activity.taskDay}
              updateActivityTaskDayFunc={updateActivityTaskDayFunc}
              // gameTask={task?.gameTask}
              // goalKPIs={task?.goalKPIs}
              // unit={task?.unitLabel}
              // onUpdateActivityValue={onUpdateActivityValue}
              //   onChangeReviewStatus={onChangeReviewStatus}
            />
          ) : visibleForm === "GOAL_SECTION" && newReview ? (
            <GameKPIForm
              review={newReview}
              // onChangeTags={onChangeTags}
              // onUpdateReviewMessage={onUpdateReviewMessage}
              // onUpdateScore={onUpdateScore}
              taskKPIs={task?.goalKPIs}
              // gameId={activity.games?.length ? activity.games[0] : ""}
              // gameTask={task?.gameTask}
              // goalKPIs={task?.goalKPIs}
              // unit={task?.unitLabel}
              onUpdateActivityValue={onUpdateActivityValue}
              //   onChangeReviewStatus={onChangeReviewStatus}
            />
          ) : visibleForm === "TIME_SELECT" && newReview ? (
            <LiveSelector
              datetime={
                newReview.activityTimeAdded
                  ? new Date(newReview.activityTimeAdded)
                  : new Date()
              }
              label="Add Activity time"
              onChange={onUpdateTime}
              pastAllow={true}
            />
          ) : visibleForm === "REVIEW_STATE" && newReview ? (
            <ReviewStateForm onComplete={onComplete} />
          ) : null}
        </div>
        <div className="flex justify-end">
          <Button type="button" appearance="outline" onClick={onBack}>
            <p className="text-gray-700">Back</p>
          </Button>

          {visibleForm !== "REVIEW_STATE" ? (
            <div className="pl-2">
              <Button type="button" appearance="contained" onClick={onNext}>
                <p className="text-white">Save and Next</p>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </CreateModal>
  );
};

export default NewAdminReviewModal;
