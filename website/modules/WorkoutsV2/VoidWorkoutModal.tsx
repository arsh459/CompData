import Divider from "@components/divider/Divider";
import { getElapsedSecondsString } from "@modules/PaymentPopover/utils";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onBackdrop: () => void;
  onCloseModal: () => void;
  onButtonPress: () => void;
  onEnd: () => void;
}

const elapsedLimit = 60 * 5;

const VoidWorkoutModal: React.FC<Props> = ({
  isOpen,
  onBackdrop,
  onButtonPress,
  onCloseModal,
  onEnd,
}) => {
  const [elapsed, setElapsed] = useState<number>(0);

  // console.log("elapsed", elapsed, elapsedLimit);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setElapsed((prev) => (prev < elapsedLimit ? prev + 1 : prev));
      }, 1000);

      // console.log("here");

      return () => {
        clearInterval(interval);
      };
    } else {
      setElapsed(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (elapsed === elapsedLimit) {
      onEnd();
    }
  }, [elapsed, onEnd]);

  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onBackdrop}
      onCloseModal={onCloseModal}
      onButtonPress={() => {}}
      heading=""
    >
      <div className="px-4 py-4 relative">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onCloseModal} />
        </div>
        <div>
          <Divider />
        </div>

        <div className="py-4">
          <p className="text-red-500 text-5xl text-center font-semibold">
            {getElapsedSecondsString(elapsedLimit - elapsed)}
          </p>
          <p className="text-gray-700 text-lg pt-1">
            Due to inactivity, your workout will get void. Please click resume
            workout to verify you are still here
          </p>
        </div>

        <div className="mt-4 z-50 flex justify-center">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={onButtonPress}
          >
            RESUME WORKOUT
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

export default VoidWorkoutModal;
