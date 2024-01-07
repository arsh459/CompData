import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  onClose: () => void;
  onProceed: () => void;
}

const Warning: React.FC<Props> = ({ onClose, onProceed }) => {
  return (
    <View className="flex-1 flex items-center justify-center p-4">
      <View className="w-full bg-white/20 rounded-2xl overflow-hidden">
        <Text
          className="text-white p-4"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          Are you sure you want to purchase the item? Your fitpoints will be
          reduced on proceed
        </Text>
        <View className="w-full h-px bg-white/20" />
        <View className="flex flex-row">
          <TouchableOpacity className="flex-1 py-3" onPress={onClose}>
            <Text
              className="text-white text-center"
              style={{ fontFamily: "Nunito-Medium" }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <View className="w-px bg-white/20" />
          <TouchableOpacity className="flex-1 py-3" onPress={onProceed}>
            <Text
              className="text-white text-center"
              style={{ fontFamily: "Nunito-Medium" }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Warning;
