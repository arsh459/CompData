import UseModal from "@components/UseModal";
import Loading from "@components/loading/Loading";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
  text: string;
  ctaCancel?: string;
  ctaProceed?: string;
  loading?: boolean;
}

const ConfirmationModal: React.FC<Props> = ({
  visible,
  onClose,
  text,
  onNext,
  ctaCancel,
  ctaProceed,
  loading,
}) => {
  return (
    <UseModal
      visible={visible}
      onClose={onClose}
      width="w-full"
      height="h-full"
      blurAmount={10}
      fallbackColor="#100F1A"
      tone="dark"
      classStr="flex justify-center items"
    >
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      ) : (
        <View
          className="m-4 p-6 bg-[#6D55D1] rounded-3xl"
          style={styles.shadow}
        >
          <Text
            className="text-white text-base"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {text}
          </Text>
          <View className="flex flex-row justify-between pt-4">
            <TouchableOpacity
              onPress={onClose}
              className="w-[48%] border-2 border-white rounded-md flex justify-center items-center py-2.5"
            >
              <Text
                className="text-white text-sm text-center"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {ctaCancel ? ctaCancel : "No keep my plan"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNext}
              className="w-[48%] bg-white rounded-md flex justify-center items-center py-2.5"
            >
              <Text
                className="text-[#6D55D1] text-sm text-center"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {ctaProceed ? ctaProceed : "Yes change it"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </UseModal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
