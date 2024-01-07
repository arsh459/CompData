import { useCurrentPeriodStore } from "../store/periodStore";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { getCurrentCycle } from "../store/utils";
import { format } from "date-fns";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import PreviousCycleList from "./PreviousCycleList";
import { useState } from "react";

const CycleComp = () => {
  const { todayUnix } = useTodayDate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const currentCycle = useCurrentPeriodStore((state) =>
    getCurrentCycle(state.cyclesArray, todayUnix)
  );

  return currentCycle ? (
    <>
      <div className="w-full p-4 bg-[#FFD2E9] border border-[#FFC8E6] rounded-xl">
        <div className="flex">
          <p className="w-1/2 text-[#383838] font-nunitoM text-base">
            Current Cycle Length
          </p>
          <p className="w-1/2 text-[#383838] font-nunitoB text-lg">
            {currentCycle.length} Days
          </p>
        </div>

        <div className="w-4 aspect-1" />

        <div className="flex">
          <p className="w-1/2 text-[#383838] font-nunitoM text-base">
            Start Cycle
          </p>
          <p className="w-1/2 text-[#383838] font-nunitoB text-lg">
            {currentCycle.startUnix
              ? format(new Date(currentCycle.startUnix), "do MMM yy")
              : ""}
          </p>
        </div>

        <div className="w-4 aspect-1" />

        <button
          onClick={() => setIsOpen(true)}
          className="w-full text-center text-base text-[#ED3C86] font-nunitoM bg-white rounded-xl shadow p-3"
        >
          View Previous Cycles
        </button>
      </div>

      <CreateModal
        onBackdrop={onClose}
        onButtonPress={onClose}
        isOpen={isOpen}
        heading=""
        onCloseModal={onClose}
        bgData="bg-white/10 backdrop-blur fixed inset-0 z-50 w-full h-full flex justify-center items-center mx-auto"
        maxW="max-w-none"
      >
        <div onClick={onClose} className="absolute inset-0 -z-10" />
        <PreviousCycleList onClose={onClose} />
      </CreateModal>
    </>
  ) : null;
};

export default CycleComp;
