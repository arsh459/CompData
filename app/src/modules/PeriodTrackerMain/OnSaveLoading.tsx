import UseModal from "@components/UseModal";
import { SafeAreaView } from "react-native";
import LoadingSpinner from "@components/LoadingSpinner";
interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  current?: string;
  // selected?: string;

  // setSelected: (val: string) => void;
  // gameStart?: number;
}

const OnSaveLoadingModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  current,
}) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      bgColor="bg-[#100F1A]"
      tone="dark"
    >
      <SafeAreaView className="flex-1 flex justify-center ">
        <LoadingSpinner />
      </SafeAreaView>
    </UseModal>
  );
};

export default OnSaveLoadingModal;
