import { WorkoutSeries } from "@models/Workouts/Series";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import Divider from "@components/divider/Divider";
import clsx from "clsx";
import General from "./OptionsModalElements/General";
import Coach from "./OptionsModalElements/Coach";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBackdrop: () => void;
  eventSeries: WorkoutSeries[];
  onFreeClick: () => void;
  onPaidClick: () => void;
}

const OptionSelector: React.FC<Props> = ({
  isOpen,
  onClose,
  onBackdrop,
  eventSeries,
  onFreeClick,
  onPaidClick,
}) => {
  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onBackdrop}
        onCloseModal={onClose}
        onButtonPress={() => {}}
        heading={""}
        maxW="max-w-5xl"
      >
        <div className="px-4 py-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div className="pb-2 cursor-pointer">
                <TopClose onCloseModal={onClose} />
              </div>
              <p className="text-center font-medium text-gray-700">
                Select your plan
              </p>
              <div />
            </div>

            <div>
              <Divider />
            </div>

            <div className="pt-4">
              {["Premium 🏅", "Free Plan"].map((item) => {
                return (
                  <div key={item} className="pb-4">
                    <div
                      className={clsx(
                        item === "Premium 🏅" ? "border-blue-500" : "",
                        "w-full p-4 border-2 rounded-xl",
                        "flex flex-col justify-center",
                        "cursor-pointer"
                      )}
                      onClick={item === "Free Plan" ? onFreeClick : onPaidClick}
                    >
                      <p className="text-gray-700 font-semibold text-lg text-center">
                        {item}
                      </p>
                      {item === "Premium 🏅" ? (
                        <Coach
                          eventSeries={eventSeries}
                          //   onClick={onPaidClick}
                        />
                      ) : (
                        <General />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={onClose}
            >
              {"Cancel"}
            </button>
          </div>
        </div>
      </CreateModal>
    </>
  );
};

export default OptionSelector;
