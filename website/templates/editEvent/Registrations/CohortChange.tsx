import { Fragment } from "react";
import clsx from "clsx";
// import ListInput from "./ListInput";
import { Dialog, Transition } from "@headlessui/react";
// import ListItemHolder from "./ListItemHolder";
import { Cohort } from "@models/Event/Event";

interface Props {
  selectedCohortId: string;
  cohorts?: { [cohortId: string]: Cohort };
  isOpen: boolean;
  closeModal: () => void;
  onCohortclick: (cohortId: string, cohortName: string) => void;
}

const CohortChange: React.FC<Props> = ({
  selectedCohortId,
  cohorts,
  isOpen,
  closeModal,
  onCohortclick,
}) => {
  //   console.log("selectedCohortId", selectedCohortId);
  //   console.log("cohorts", cohorts);
  //   const [selectedIndex, setSelectedIndex] = useState<number>(0);
  //   const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Select Cohorts
                </Dialog.Title>

                <div className="pt-2 flex flex-wrap space-x-2">
                  {cohorts &&
                    Object.values(cohorts).map((item) => {
                      return (
                        <div
                          onClick={() =>
                            onCohortclick(item.id, item.cohortName)
                          }
                          key={item.id}
                          className={clsx(
                            "px-2 py-1 shadow-md border-4 rounded-full cursor-pointer",
                            selectedCohortId === item.id
                              ? "border-blue-500"
                              : "border-gray-200"
                          )}
                        >
                          <p>{item.cohortName}</p>
                        </div>
                      );
                    })}

                  {!cohorts || Object.values(cohorts).length === 0 ? (
                    <div className="pt-2">
                      <p className="text-gray-700 text-lg text-center">
                        No Cohorts for this event
                      </p>
                    </div>
                  ) : null}
                </div>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div> */}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CohortChange;
