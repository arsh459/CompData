import { View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { minusIconFAQ, plusIconFAQ } from "@constants/imageKitURL";
import clsx from "clsx";
import { FAQDATA } from "../utils";
interface Props {
  // isOpen: boolean;
  // setIsOpen: () => void;
  faq: FAQDATA;
  borderColorTw?: string;
  dontShowLastLine?: boolean;
}
const FAQCompNew: React.FC<Props> = ({
  faq,
  borderColorTw,
  dontShowLastLine,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFaq = () => setIsOpen((prev) => !prev);
  // const uri = isOpen ? faqUpIcon : faqDownIcon;
  const uri = isOpen ? minusIconFAQ : plusIconFAQ;
  return (
    <View className="px-4">
      <Pressable onPress={toggleFaq} className="flex flex-row flex-1 ">
        <Text
          className="flex-1 text-sm text-white "
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {faq.heading}
        </Text>
        <View className="pl-2 ">
          <Image source={{ uri }} className="w-4 iphoneX:w-6 aspect-square" />
        </View>
      </Pressable>
      {isOpen ? (
        <Text
          className="font-sans pt-4 font-light text-xs text-[#FFFFFF8C]"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {faq.text}
        </Text>
      ) : null}
      {dontShowLastLine ? null : (
        <View
          className={clsx(
            " w-full  ",
            "my-7 h-px",
            borderColorTw ? borderColorTw : "bg-[#4D4D4D]"
          )}
        />
      )}
    </View>
  );
};

export default FAQCompNew;
