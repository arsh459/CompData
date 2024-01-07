import UseModal from "@components/UseModal";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

interface Props {
  onClose: () => void;
  onProceed: () => void;
  onOpen: boolean;
}

const UndoModal: React.FC<Props> = ({ onClose, onProceed, onOpen }) => {
  return (
    <UseModal
      visible={onOpen}
      onClose={onClose}
      width="w-full"
      height="h-full flex-1"
      fallbackColor="#232136"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
    >
      <SafeAreaView className="flex bg-[#23213699] flex-1">
        <View className="flex-1 flex items-center justify-center p-4">
          <View className="w-full bg-[#343150] rounded-2xl overflow-hidden">
            <Text
              className="text-white p-4 text-center text-xs iphoneX:text-sm"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              Are you sure you want to undo this item ?
            </Text>

            <View className="flex flex-row">
              <TouchableOpacity
                className="flex-1 py-3 m-2 rounded-lg bg-[#5D588C] "
                onPress={onClose}
              >
                <Text
                  className="text-white text-center text-xs iphoneX:text-sm"
                  style={{ fontFamily: "Nunito-SemiBold" }}
                >
                  No
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-3 m-2 rounded-lg bg-[#5D588C]"
                onPress={onProceed}
              >
                <Text
                  className="text-white text-center text-xs iphoneX:text-sm"
                  style={{ fontFamily: "Nunito-SemiBold" }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </UseModal>
  );
};

export default UndoModal;
