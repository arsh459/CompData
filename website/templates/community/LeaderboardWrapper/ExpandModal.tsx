import CreateModal from "@templates/community/Program/CreateModal/CreateModal";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
}

const ExpandModal: React.FC<Props> = ({ isOpen, onCloseModal, children }) => {
  return (
    <CreateModal
      onBackdrop={onCloseModal}
      onButtonPress={onCloseModal}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="bg-gradient-to-b from-white/40 to-[#C8C8C8]/40 backdrop-blur-2xl fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full">{children}</div>
    </CreateModal>
  );
};

export default ExpandModal;
