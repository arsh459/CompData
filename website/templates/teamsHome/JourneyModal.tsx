import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import JourneyWidget from "./JourneyWidget";
import UpgradeLevel from "./UpgradeLevel";
// import { useState } from "react";
// import MonthlyGraph from "./MonthlyGraph";
// import WeeklyGraph from "./WeeklyGraph";
// import Toggler from "./Toggler";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  userLevelV2: number;
  activeFitPointsV2: number;
  dayPointObj?: { [day: string]: number };
}

const JourneyModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  userLevelV2,
  activeFitPointsV2,
  dayPointObj,
}) => {
  //   const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={() => setIsOpen(false)}
      onButtonPress={() => setIsOpen(false)}
      onCloseModal={() => setIsOpen(false)}
      bgData="bg-gradient-to-b from-[#2B2B2B] to-[#000000] fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full p-4 overflow-y-scroll">
        <div className="sticky top-0 flex items-center justify-between">
          <h2 className="text-2xl italic font-extrabold text-white">
            Your Journey
          </h2>
          <CloseBtn onCloseModal={() => setIsOpen(false)} />
        </div>
        <div className="py-4">
          {/* {enabled ? <WeeklyGraph userLvl={4} /> : <MonthlyGraph userLvl={4} />}
          <Toggler enabled={enabled} setEnabled={setEnabled} /> */}
        </div>
        <JourneyWidget
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dayPointObj={dayPointObj}
          userLevelV2={userLevelV2}
          activeFitPointsV2={activeFitPointsV2}
        />
        <p className="text-[#AFAFAF] text-xs italic text-center py-1.5">
          Note: Levels are calculated on the basis of last 30 days Fitpoints
        </p>
        <UpgradeLevel
          userLevelV2={userLevelV2}
          activeFitPointsV2={activeFitPointsV2}
        />
      </div>
    </CreateModal>
  );
};

export default JourneyModal;
