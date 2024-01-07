import Button from "@components/button";
import {
  adminDashboardQuery,
  adminDashboardQueryKeys,
} from "@hooks/dashboard/useAdminDashboard";
// import { dashboardQuery } from "@hooks/drawer/interface";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import DatesModal from "./DatesModal";
import GameModal from "./GameModal";
import GamePeriodSelector from "./GamePeriodSelector";
import JudgesSearch from "./JudgesModal";
import PlayerSearch from "./PlayerSearch";
// import SearchModal from "./PlayerSearch";
import StatesModal from "./StatesModal";
import TaskSearch from "./TaskModal";
import TeamsModal from "./TeamsModal";

interface Props {
  modalState: adminDashboardQueryKeys | "NOT_VISIBLE";
  onClose: () => void;
  q: adminDashboardQuery;
  onClearFilter: (type: adminDashboardQueryKeys | "NOT_VISIBLE") => void;
}

const FilterModalHolder: React.FC<Props> = ({
  modalState,
  onClose,
  q,
  onClearFilter,
}) => {
  return (
    <CreateModal
      isOpen={modalState !== "NOT_VISIBLE"}
      onBackdrop={onClose}
      onCloseModal={onClose}
      heading=""
      //   maxW="max-w-2xl"
      onButtonPress={() => {}}
    >
      <div className="p-4">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onClose} />
        </div>

        {modalState === "game" ? (
          <GameModal q={q} onClose={onClose} />
        ) : modalState === "dE" || modalState === "dS" ? (
          <DatesModal q={q} />
        ) : modalState === "state" ? (
          <StatesModal state={q.state ? q.state : ""} q={q} onClose={onClose} />
        ) : modalState === "player" ? (
          <PlayerSearch q={q} onClose={onClose} />
        ) : modalState === "agent" ? (
          <JudgesSearch
            selectedId={q.agent ? q.agent : ""}
            q={q}
            onClose={onClose}
          />
        ) : modalState === "team" ? (
          <TeamsModal q={q} onClose={onClose} />
        ) : modalState === "taskId" ? (
          <TaskSearch
            q={q}
            taskId={q.taskId ? q.taskId : ""}
            taskName={q.taskName ? q.taskName : ""}
            onClose={onClose}
          />
        ) : modalState === "season" ? (
          <GamePeriodSelector type="season" q={q} onClose={onClose} />
        ) : modalState === "round" ? (
          <GamePeriodSelector type="round" q={q} onClose={onClose} />
        ) : null}

        <div className="flex justify-end">
          <Button
            type="button"
            appearance="outline"
            onClick={() => onClearFilter(modalState)}
          >
            <p className="text-gray-700">Clear Filter</p>
          </Button>
          <div className="pl-2">
            <Button type="button" appearance="outline" onClick={onClose}>
              <p className="text-gray-700">Close</p>
            </Button>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default FilterModalHolder;
