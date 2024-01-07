import UseModal from "@components/UseModal";
import { View, Text, Pressable } from "react-native";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  text: string;
}

const PendingModal: React.FC<Props> = ({ isOpen, onCloseModal, text }) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      blurAmount={10}
      fallbackColor="#100F1A"
      tone="dark"
    >
      <Pressable
        onPress={onCloseModal}
        className="flex-1 flex justify-center items-center p-12"
      >
        <Text
          className="text-[#FFCB46] text-2xl text-center"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {text}
        </Text>
        <View className="w-12 aspect-square" />
        <Text
          className="text-[#CCCCCC] text-base text-center"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Tap anywhere to close
        </Text>
      </Pressable>
    </UseModal>
  );
};

export default PendingModal;
