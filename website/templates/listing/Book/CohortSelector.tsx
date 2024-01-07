import { Dialog, Transition } from "@headlessui/react";
import { LocalCohort } from "@models/Event/Event";
import { Fragment } from "react";
import CohortElement from "../BookingModal/CohortElement";

interface Props {
  heading: string;
  cohorts: LocalCohort[];
  explainer: string;
  isOpen: boolean;
  closeModal: () => void;
  cost: number;
  onButtonClick: (id: string) => void;
  cta: string;
  keyWord: string;
}

const CohortSelector: React.FC<Props> = ({
  heading,
  explainer,
  onButtonClick,
  isOpen,
  closeModal,
  cohorts,
  cost,
  keyWord,
  cta,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
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
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
                className="text-xl font-medium leading-6 text-gray-700"
              >
                {heading}
              </Dialog.Title>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{explainer}</p>
              </div>

              <div>
                {cohorts.map((item) => {
                  return (
                    <div className="pb-4" key={item.id}>
                      <CohortElement
                        buttonPlacement="right"
                        cohort={item}
                        cta={
                          item.cohortSize <= item.seatsBooked ? "Sold out" : cta
                        }
                        onClick={
                          item.cohortSize <= item.seatsBooked
                            ? () => {}
                            : () => onButtonClick(item.id)
                        }
                        keyWord={keyWord}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CohortSelector;
