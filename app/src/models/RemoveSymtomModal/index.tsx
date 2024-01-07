import UseModal from "@components/UseModal";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const RemoveSymtomModal: React.FC<Props> = ({ isOpen, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#232136"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
      classStr="flex flex-1 justify-center items-center p-6 bg-red-700 relative z-0"
    >
      <View className="w-4/5  overflow-hidden z-10">
        <Text
          className="text-white py-4 text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Are you sure you want to remove the symptom?
        </Text>

        <View className="flex flex-row flex-1">
          <TouchableOpacity
            className="flex-1 py-2.5 bg-indigo-500 rounded-md mr-3"
            onPress={handleDelete}
          >
            <Text
              className="text-white text-center text-xs"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-2.5 bg-gray-500 rounded-md mr-2"
            onPress={onClose}
          >
            <Text
              className="text-white text-center text-xs"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#232136E5] -z-0" />
    </UseModal>
  );
};

export default RemoveSymtomModal;
