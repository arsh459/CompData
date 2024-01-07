import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SessionForm from "./SessionForm";
import { sessionTypes, SessionV2 } from "@models/Event/Event";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  //   onSave: () => void;
  selectedSession?: SessionV2;
  onSessionChange: (
    keyToChange: "name" | "description" | "youtubeLink" | undefined,
    value: string,
    newMedia?: CloudinaryMedia,
    isLive?: boolean,
    isFree?: boolean,
    deleteMedia?: boolean,
    newSessionType?: sessionTypes
  ) => void;
  formState: "name" | "isLive" | "media" | "sessionType";
  onNext: () => void;
  onBack: () => void;
  //   modalHeading: string;
}

const SessionAdder: React.FC<Props> = ({
  isOpen,
  closeModal,
  selectedSession,
  onSessionChange,
  //   onSave,
  formState,
  onNext,
  onBack,
  //   modalHeading,
}) => {
  //   const [formState, setFormState] = useState<"name" | "isLive" | "media">(
  //     "name"
  //   );

  //   const onNext = () => {
  //     if (formState === "name") {
  //       setFormState("media");
  //     } else if (formState === "media") {
  //       setFormState("isLive");
  //     } else {
  //       onSave();
  //     }
  //   };

  //   const onBack = () => {
  //     if (formState === "media") {
  //       setFormState("name");
  //     } else if (formState === "isLive") {
  //       setFormState("media");
  //     } else {
  //     }
  //   };

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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 text-center"
                >
                  {formState === "sessionType"
                    ? "Select Session type"
                    : formState === "name"
                    ? "Add Session brief"
                    : formState === "media"
                    ? "Any video to share?"
                    : "Additional information"}
                </Dialog.Title>

                <div className="pt-4">
                  {selectedSession ? (
                    <SessionForm
                      formState={formState}
                      session={selectedSession}
                      onSessionChange={onSessionChange}
                    />
                  ) : null}
                </div>

                {true ? <div className="pt-4 pb-2"></div> : null}

                <div className="mt-4 flex">
                  {formState !== "sessionType" ? (
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={onBack}
                    >
                      Back
                    </button>
                  ) : null}

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onNext}
                  >
                    {formState === "isLive" ? "Save" : "Next"}
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

export default SessionAdder;
