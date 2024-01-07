import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
  heading: string;
  subtitle: string;
  loading?: boolean;
  ctaCancel?: string;
  ctaProceed?: string;
}

const WarningModal: React.FC<Props> = ({
  visible,
  onClose,
  heading,
  subtitle,
  onNext,
  loading,
  ctaCancel,
  ctaProceed,
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
        <View className="px-12">
          <Text
            className="text-white text-2xl"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {heading}
          </Text>
          <Text
            className="text-[#CCCCCC] text-sm my-4"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {subtitle}
          </Text>
          <View className="my-4 flex flex-row gap-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-[#6D55D1] rounded-md py-2.5"
            >
              <Text
                className="text-white text-sm text-center"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                {ctaCancel ? ctaCancel : "No keep my plan"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNext}
              className="flex-1 bg-[#5D588C] rounded-md py-2.5"
            >
              <Text
                className="text-white text-sm text-center"
                style={{ fontFamily: "Nunito-Medium" }}
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

export default WarningModal;
