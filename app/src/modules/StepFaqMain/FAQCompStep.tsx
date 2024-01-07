import { View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { minusIconFAQ, plusIconFAQ } from "@constants/imageKitURL";
import clsx from "clsx";
import { FAQDATA } from "@modules/ProScreenMain/utils";
interface Props {
  // isOpen: boolean;
  // setIsOpen: () => void;
  faq: FAQDATA;
  borderColorTw?: string;
}
const FAQCompStep: React.FC<Props> = ({ faq, borderColorTw }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFaq = () => setIsOpen((prev) => !prev);
  const uri = isOpen ? minusIconFAQ : plusIconFAQ;
  return (
    <View className="px-4">
      <Pressable onPress={toggleFaq} className="flex flex-row flex-1 ">
        <Text className="font-sans font-light flex-1 text-sm text-white ">
          {faq.heading}
        </Text>
        <View className="pl-2 ">
          <Image source={{ uri }} className="w-4 iphoneX:w-6 aspect-square" />
        </View>
      </Pressable>
      {isOpen ? (
        <Text className="font-sans pt-4 flex-1 text-left pr-2 font-light text-xs text-[#FFFFFF99]">
          {faq.text}
        </Text>
      ) : null}
      <View
        className={clsx(
          " w-full  ",
          "mb-7 h-px",
          borderColorTw ? borderColorTw : "bg-[#4D4D4D]"
        )}
      />
    </View>
  );
};

export default FAQCompStep;
