import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  message: string;
  onClose: () => void;
  onProceed: () => void;
}

const ConfirmDaysAndTime: React.FC<Props> = ({ message, onClose }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-5 flex flex-col items-center">
      <View className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white w-5 h-5 rotate-45deg"></View>
      <View className="flex flex-col items-center">
        <Text className="text-lg font-bold mb-4 text-center">{message}</Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <Text className="font-bold">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmDaysAndTime;
