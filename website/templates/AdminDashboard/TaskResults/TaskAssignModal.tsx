import Button from "@components/button";
import {
  Activity,
  AlgoliaActivity,
  reviewStatus,
} from "@models/Activities/Activity";
import {
  addNewJudge,
  updateActivityState,
} from "@models/Activities/createUtils";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import JudgesSearch from "../FilterModal/JudgesModal";
import StatesModal from "../FilterModal/StatesModal";

interface Props {
  isVisible: "JUDGE_ASSIGN" | "STATE_ASSIGN" | "HIDDEN";
  task: AlgoliaActivity | Activity;
  onClose: () => void;
  onRefresh: () => void;
}

const TaskAssignModal: React.FC<Props> = ({
  onRefresh,
  isVisible,
  onClose,
  task,
  //   type,
}) => {
  const onJudgeAssign = async (newLeaderboard?: LeaderBoard) => {
    if (newLeaderboard) {
      await addNewJudge(task, newLeaderboard);

      onRefresh();
    }
  };

  const onStateAssign = async (newState: reviewStatus) => {
    await updateActivityState(task, newState);
    onRefresh();
  };

  return (
    <CreateModal
      isOpen={isVisible !== "HIDDEN"}
      onBackdrop={onClose}
      onCloseModal={onClose}
      heading=""
      onButtonPress={() => {}}
    >
      <div className="p-4">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onClose} />
        </div>

        {isVisible === "JUDGE_ASSIGN" ? (
          <JudgesSearch
            allJudgesHidden={true}
            onClose={onClose}
            onSelectOverride={onJudgeAssign}
            selectedId={
              task.activeMessage?.authorUID ? task.activeMessage?.authorUID : ""
            }
          />
        ) : isVisible === "STATE_ASSIGN" ? (
          <StatesModal
            state={task.reviewStatus ? task.reviewStatus : ""}
            onClose={onClose}
            onStateChangeOverride={onStateAssign}
          />
        ) : null}

        <div className="flex justify-end">
          <Button type="button" appearance="outline" onClick={onClose}>
            <p className="text-gray-700">Close</p>
          </Button>
        </div>
      </div>
    </CreateModal>
  );
};

export default TaskAssignModal;
