import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BlurBG from "@components/BlurBG";
import { removeFromContext } from "@hooks/chatbot/utils";

interface Props {
  visible: boolean;
  setVisible: (val: boolean) => void;
  uid: string;
  roomId: string;
}

const Confirmation: React.FC<Props> = ({
  visible,
  setVisible,
  uid,
  roomId,
}) => {
  const onCancel = () => {
    setVisible(false);
  };

  const onClear = async () => {
    setVisible(false);
    await removeFromContext(uid, roomId);
  };

  return visible ? (
    <>
      <BlurBG
        style={StyleSheet.absoluteFill}
        blurAmount={10}
        fallbackColor="#232136E5"
        blurType="dark"
      />
      <View
        style={StyleSheet.absoluteFill}
        className="flex justify-end items-center p-8"
      >
        <Text className="text-[#CFC7FF] text-sm text-center">
          Are you sure you want to clear your chat
        </Text>
        <View className="flex flex-row mt-4">
          <TouchableOpacity
            onPress={onClear}
            className="flex-1 bg-white rounded-lg py-2"
          >
            <Text className="text-[#5E45C8] text-sm font-bold text-center">
              Yes
            </Text>
          </TouchableOpacity>
          <View className="w-4 aspect-square" />
          <TouchableOpacity
            onPress={onCancel}
            className="flex-1 bg-white rounded-lg py-2"
          >
            <Text className="text-[#5E45C8] text-sm font-bold text-center">
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ) : null;
};

export default Confirmation;
