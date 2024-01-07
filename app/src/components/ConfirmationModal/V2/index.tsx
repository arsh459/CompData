import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
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

const ConfirmationModalV2: React.FC<Props> = ({
  visible,
  onClose,
  text,
  onNext,
  ctaCancel,
  ctaProceed,
  loading,
}) => {
  const handleNext = () => {
    onClose();
    onNext();
  };

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
        <View className="m-4 bg-[#343150] rounded-3xl" style={styles.shadow}>
          <Text
            className="text-white text-base mx-6 my-4"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {text}
          </Text>
          <View className="flex flex-row justify-between border-t border-white/10">
            <TouchableOpacity
              onPress={onClose}
              className="w-[48%] flex justify-center items-center py-4"
            >
              <Text
                className="text-white text-base text-center"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                {ctaCancel ? ctaCancel : "No"}
              </Text>
            </TouchableOpacity>
            <View className="h-full w-px bg-white/10" />
            <TouchableOpacity
              onPress={handleNext}
              className="w-[48%] flex justify-center items-center py-4"
            >
              <Text
                className="text-white text-base text-center"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                {ctaProceed ? ctaProceed : "Yes"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </UseModal>
  );
};

export default ConfirmationModalV2;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
