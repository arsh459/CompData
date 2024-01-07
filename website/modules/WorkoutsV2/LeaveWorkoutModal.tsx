import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import LeaveWorkout from "./leaveWorkout";

interface Props {
  isOpen: boolean;
  //   onBack: () => void;
  onLeaveWorkout: () => void;
  onCloseModal: () => void;
  points: number;
}

const LeaveWorkoutModal: React.FC<Props> = ({
  isOpen,
  //   onBack,
  onLeaveWorkout,
  onCloseModal,
  points,
}) => {
  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onCloseModal}
      onCloseModal={onCloseModal}
      //   onCloseModal={() => setCnfrmLeaveModal(false)}
      heading=""
      onButtonPress={() => {}}
      //   key={activeTab}
    >
      <LeaveWorkout
        // selectedWorkout={{}}
        // onLeaveWorkoutFn={() => {}}
        points={points}
        onLeave={onLeaveWorkout}
        // selectedWorkout={selectedWorkout}
        // onLeaveWorkoutFn={onConfirmStopWorkoutFn}
        onBack={onCloseModal}
      />
    </CreateModal>
  );
};

export default LeaveWorkoutModal;
