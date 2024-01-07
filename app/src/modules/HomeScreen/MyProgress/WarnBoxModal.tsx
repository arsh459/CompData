// import BlurBG from "@components/BlurBG";
// import IconTextBtn from "@components/Buttons/IconTextBtn";
import UseModal from "@components/UseModal";
import { LinearGradient } from "expo-linear-gradient";
// import { useState } from "react";
import { View, Text } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  cta1: string;
  cta2: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  colors?: string[];
}

const WarnBoxModal: React.FC<Props> = ({
  isOpen,
  onClose,
  text,
  cta1,
  cta2,
  onLeftClick,
  onRightClick,
  colors,
}) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#100F1AF4"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
    >
      <LinearGradient
        colors={
          colors && colors.length >= 2
            ? colors
            : ["#05E1D4B0", "#00000042", "#05E1D4B0"]
        }
        className="flex-1"
      >
        <View className=" flex items-center justify-center flex-1  bg-[#00000042] ">
          <View className="relative bg-[#FFFFFF21]  mx-4 rounded-2xl ">
            <Text
              // className="text-white"
              className="py-3 px-7 text-base iphoneX:text-lg text-[#DEDEDE] border-b border-b-[#FFFFFF36]"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              {text}
            </Text>
            <View className=" flex flex-row z-10">
              <View className="w-px h-4 " />
              <Text
                className="flex-1 text-center py-4 text-base border-r-[0.5px] border-r-[#FFFFFF36]  iphoneX:text-lg text-[#D0D0D0] "
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                onPress={onLeftClick}
              >
                {cta1}
              </Text>
              <Text
                className="flex-1 text-center py-4 text-base iphoneX:text-lg  border-l-[0.5px] border-l-[#FFFFFF36]  text-white"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                onPress={onRightClick}
              >
                {cta2}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </UseModal>
  );
};

export default WarnBoxModal;
