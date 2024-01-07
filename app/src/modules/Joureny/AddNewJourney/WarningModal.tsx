import UseModal from "@components/UseModal";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const WarningModal: React.FC<Props> = ({ isOpen, onClose, onDelete }) => {
  const handleDelete = () => {
    onClose();
    onDelete();
  };

  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#13121E"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
      classStr="flex justify-center items-center p-6"
    >
      <View className="w-full bg-white/20 rounded-2xl overflow-hidden">
        <Text
          className="text-white p-4"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          Are you sure you want to delete this journey?
        </Text>
        <View className="w-full h-px bg-white/20" />
        <View className="flex flex-row">
          <TouchableOpacity className="flex-1 py-3" onPress={handleDelete}>
            <Text
              className="text-white text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <View className="w-px bg-white/20" />
          <TouchableOpacity className="flex-1 py-3" onPress={onClose}>
            <Text
              className="text-white text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </UseModal>
  );
};

export default WarningModal;
