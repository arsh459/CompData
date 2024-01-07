import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
// import CirclePercentV2 from "./CircleRings/CirclePercentV2";
// import GoalModalWidget from "./GoalModalWidget";
// import GoalProgressWidget from "./GoalProgramContainer/GoalProgressWidget";
// import YourGoalData from "./YourGoalData";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  circleSize?: number;
  time?: number;
  pace?: number;
  distance?: number;
  data?: {
    percent: number;
    color: string;
  }[];
}

const GoalModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  circleSize,
  data,
  distance,
  time,
  pace,
}) => {
  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={() => setIsOpen(false)}
      onButtonPress={() => setIsOpen(false)}
      onCloseModal={() => setIsOpen(false)}
      bgData="bg-[#282828] fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full p-4 overflow-y-scroll">
        <div className="sticky top-0 flex items-center justify-between">
          <h2 className="text-2xl italic font-extrabold text-white">
            Your Goal
          </h2>
          <CloseBtn onCloseModal={() => setIsOpen(false)} />
        </div>
        <div className="h-px bg-[#515151]" />
        <div className="py-4" />

        {/* <GoalModalWidget isOpen={isOpen} setIsOpen={setIsOpen} />
        {circleSize && data ? (
          <div className="flex justify-between  py-2 gap-2">
            <CirclePercentV2 circleSize={circleSize} data={data} />
            <YourGoalData />
          </div>
        ) : null} */}
        {/* <GoalProgressWidget
          circleSize={circleSize}
          data={data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          distance={distance}
          pace={pace}
          time={time}
        /> */}
      </div>
    </CreateModal>
  );
};

export default GoalModal;
