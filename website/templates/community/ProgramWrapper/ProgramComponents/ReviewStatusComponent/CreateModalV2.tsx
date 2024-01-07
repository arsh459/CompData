import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  bgProps?: string;
}

const CreateModalV2: React.FC<Props> = ({ isOpen, bgProps, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="absolute inset-0 z-30">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              "absolute inset-0",
              bgProps ? bgProps : "bg-[#EDEDED]/90 backdrop-blur-2xl"
            )}
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="inline-block w-full h-full overflow-hidden text-left align-middle transition-all transform p-4">
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default CreateModalV2;
