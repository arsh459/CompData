import Divider from "@components/divider/Divider";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import { Link } from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBackdrop: () => void;
  eventId: string;
  leaderKey: string;
  //   childEvents: EventInterface[];
}

const NewCreatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onBackdrop,
  eventId,
  leaderKey,
  //   childEvents,
}) => {
  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onBackdrop}
        onCloseModal={onClose}
        onButtonPress={() => {}}
        heading={""}
        // maxW="max-w-5xl"
      >
        <div className="px-4 py-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div className="pb-2 cursor-pointer">
                <TopClose onCloseModal={onClose} />
              </div>
              <p className="text-center font-medium text-gray-700">
                Join as a creator
              </p>
              <div />
            </div>

            <div>
              <Divider />
            </div>

            <div className="pt-4 pb-4">
              <p className="text-gray-700 text-base">
                You would have to sign up as a creator to start your team. To
                start your journey as a coach click below!
              </p>
            </div>
          </div>

          <div className="flex justify-evenly pt-2">
            <Link
              href={`/onboard?eventId=${eventId}&leaderKey=${leaderKey}`}
              target="_blank"
            >
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                //   onClick={onClose}
              >
                {"Start your team"}
              </button>
            </Link>
          </div>
        </div>
      </CreateModal>
    </>
  );
};

export default NewCreatorModal;
