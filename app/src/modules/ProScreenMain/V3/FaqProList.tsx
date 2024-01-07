import { View, Text } from "react-native";

import { faqContent } from "../utils";
import FAQCompNew from "./FAQCompNew";

const FaqProList = () => {
  return (
    <View>
      <Text
        className="text-sm iphoneX:text-base py-4 pl-5 text-white"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        FAQ
      </Text>
      <View className="flex-1">
        {faqContent.map((faq, index) => (
          <View key={faq.id}>
            <FAQCompNew
              faq={faq}
              dontShowLastLine={index === faqContent.length - 1}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default FaqProList;
