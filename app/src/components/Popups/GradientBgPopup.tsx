import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  text: string;
  ctaText: string;
  onPressCTA: () => void;
  ctaTextSecondary?: string;
  onPressCTASecondary?: () => void;
}

const GradientBgPopup: React.FC<Props> = ({
  children,
  visible,
  onClose,
  text,
  ctaText,
  onPressCTA,
  ctaTextSecondary,
  onPressCTASecondary,
}) => {
  return (
    <UseModal
      visible={visible}
      onClose={onClose}
      width="w-full"
      height="h-full"
      tone="dark"
    >
      <View className="w-full h-full bg-black/80 flex justify-center p-4">
        <CloseBtn
          color="#FFFFFF"
          onClose={onClose}
          classStr="w-5 aspect-square self-end"
        />
        <View className="mt-4 rounded-2xl bg-black overflow-hidden">
          <LinearGradient colors={["#10B2B3B2", "#553CA8B2"]}>
            {children}
            <View className="p-4">
              <Text className="text-white/80 text-base">{text}</Text>
              <View className="w-4 aspect-square" />
              <View className="flex-1 flex flex-row justify-between">
                <TouchableOpacity
                  onPress={onPressCTA}
                  className={clsx(
                    "bg-white p-4",
                    onPressCTASecondary
                      ? "w-[48%] rounded-2xl"
                      : "w-full rounded-full"
                  )}
                >
                  <Text className="text-[#100F1A] text-sm font-bold text-center">
                    {ctaText}
                  </Text>
                </TouchableOpacity>
                {onPressCTASecondary ? (
                  <TouchableOpacity
                    onPress={onPressCTASecondary}
                    className="w-[48%] bg-white  rounded-2xl p-4"
                  >
                    <Text className="text-[#100F1A] text-sm font-bold text-center">
                      {ctaTextSecondary ? ctaTextSecondary : "-"}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </UseModal>
  );
};

export default GradientBgPopup;
