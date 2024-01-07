import LoadingSpinner from "@components/LoadingSpinner";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  current?: string;
}

const OnSaveLoadingModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  current,
}) => {
  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onCloseModal}
      onButtonPress={onCloseModal}
      onCloseModal={onCloseModal}
      heading=""
      maxW="max-w-none"
      bgData="w-screen h-screen bg-[#100F1A]"
    >
      <div className="w-full h-full flex flex-col">
        <LoadingSpinner />
      </div>
    </CreateModal>
  );
};

export default OnSaveLoadingModal;
