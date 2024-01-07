import CreateModal from "../CreateModal/CreateModal";
import TopClose from "../Feed/TopClose";
import { Divider } from "@mui/material";
// import PrivacyPolicyContent from "./PrivacyPolicyContent";
import PermissionsContent from "./PermissionsContent";

interface Props {
  isOpen: boolean;
  onBackDrop: () => void;
  onCloseModal: () => void;
  onButtonPress: () => void;
}

const GivePermissionsModal: React.FC<Props> = ({
  isOpen,
  onBackDrop,
  onButtonPress,
  onCloseModal,
}) => {
  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onBackDrop}
      onCloseModal={onCloseModal}
      onButtonPress={onButtonPress}
      heading=""
    >
      <div className="p-4 max-h-[85vh] overflow-y-auto scrollbar-hide relative">
        <div className="cursor-pointer">
          <TopClose onCloseModal={onCloseModal} />
          <div className="pt-2">
            <Divider />
          </div>
        </div>

        <div className="pt-2 pb-2">
          <PermissionsContent />
        </div>

        <div className="flex justify-end pt-2">
          <div className="pr-2">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={onButtonPress}
            >
              Connect now
            </button>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default GivePermissionsModal;
