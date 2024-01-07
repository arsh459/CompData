import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
// import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onBackdrop: () => void;
  onButtonPress: () => void;
}

const TrackListModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onBackdrop,
  onButtonPress,
}) => {
  return (
    <CreateModal
      onBackdrop={onBackdrop}
      onButtonPress={onButtonPress}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="backdrop-blur-[19px] bg-[#F2F2F2]/[0.57] fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col justify-center p-4 text-white">
        <div className="flex justify-between items-center bg-gradient-to-r from-[#EB7963]/[.94] to-[#F6A064]/[0.94] rounded-xl m-1 px-4 py-2">
          <h3>Track List</h3>
          <TopClose onCloseModal={onCloseModal} />
        </div>
        {["a", "b", "c"].map((item) => (
          <div
            key={item}
            className="bg-gradient-to-r from-[#EB7963]/[.94] to-[#F6A064]/[0.94] rounded-xl m-1"
          >
            <div className="flex justify-between items-center px-4 py-2">
              <div>Track List</div>
              <div>Track List</div>
            </div>
            <div className="flex justify-center items-center border-t px-4 py-2">
              Track List
            </div>
          </div>
        ))}
      </div>
    </CreateModal>
  );
};

export default TrackListModal;
