import { View, Text } from "react-native";
import FAQComp from "@modules/ProScreenMain/FAQComp";
import { faqContent } from "@modules/ProScreenMain/utils";

const FAQ = () => {
  return (
    <View>
      <Text
        className="text-white text-5xl text-center leading-none py-4 mt-20"
        style={{ fontFamily: "Canela-Light" }}
      >
        Frequently asked questions
      </Text>
      {faqContent.map((faq, index) => (
        <View key={faq.id}>
          {index === 0 ? <View className="m-4 h-px" /> : null}
          <FAQComp
            faq={faq}
            borderColorTw="border-transparent"
            borderStr="my-4 h-px"
          />
        </View>
      ))}
    </View>
  );
};

export default FAQ;
