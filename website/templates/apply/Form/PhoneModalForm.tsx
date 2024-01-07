import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  isOpen: boolean;
  heading: string;
  onCloseModal: () => void;
}

const PhoneModalForm: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  heading,
  children,
}) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onCloseModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

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
            <div className="inline-block w-full max-w-md  overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
              {/* <Dialog.Title
                as="h3"
                className="text-lg text-center font-medium leading-6 text-gray-900"
              >
                {heading}
              </Dialog.Title> */}

              {children}

              {/* <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {}}
                >
                  Post
                </button>
              </div> */}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default PhoneModalForm;
