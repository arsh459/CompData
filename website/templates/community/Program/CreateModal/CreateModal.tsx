import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  heading: string;
  onCloseModal: () => void;
  onBackdrop: () => void;
  onButtonPress: () => void;
  maxW?: string;
  bgProp?: string;
  bgData?: string;
  slideDown?: boolean;
}

const CreateModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  heading,
  children,
  onButtonPress,
  onBackdrop,
  maxW,
  bgProp,
  bgData,
  slideDown,
}) => {
  return (
    <div className="">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={onBackdrop}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div
            className={clsx(
              "min-h-screen text-center",
              bgData || bgProp ? "" : "mx-2"
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom={slideDown ? "-translate-y-full" : "opacity-0"}
              enterTo={slideDown ? "translate-0" : "opacity-100"}
              leave="ease-in duration-200"
              leaveFrom={slideDown ? "translate-y-0" : "opacity-100"}
              leaveTo={slideDown ? "-translate-y-full" : "opacity-0"}
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
              enterFrom={slideDown ? "-translate-y-full" : "opacity-0 scale-95"}
              enterTo={slideDown ? "translate-0" : "opacity-100 scale-100"}
              leave="ease-in duration-200"
              leaveTo={slideDown ? "-translate-y-full" : "opacity-0 scale-95"}
              leaveFrom={slideDown ? "translate-0" : "opacity-100 scale-100"}
            >
              <div
                className={clsx(
                  maxW ? maxW : "max-w-md",
                  "inline-block w-full overflow-hidden text-left align-middle transition-all transform",
                  bgData
                    ? bgData
                    : bgProp
                    ? bgProp
                    : "bg-white shadow-xl rounded-2xl"
                )}
              >
                <Dialog.Title
                  as="h3"
                  className="text-center font-medium text-gray-700"
                >
                  {heading}
                </Dialog.Title>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div> */}

                {children}

                {/* <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onButtonPress}
                  >
                    Post
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateModal;
