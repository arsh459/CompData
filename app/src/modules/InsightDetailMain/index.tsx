import Header from "@modules/Header";
import { InsightDetailProps } from "@screens/InsightsDetail";
import { LinearGradient } from "expo-linear-gradient";
import { Text, ScrollView, View } from "react-native";
import Prompts from "./Prompts";
// import { useSuggestedPrompt } from "./hook/useSuggestedPrompt";
import { usePeriodRecomondation } from "./hook/usePeriodRecomondation";
import Loading from "@components/loading/Loading";
import BotTyping from "@modules/ChatBot/ChatRoomMain/BotTyping";

const InsightDetailMain: React.FC<InsightDetailProps> = ({
  periodDateId,
  type,
}) => {
  const { insightData, loading, prompts, fetching } = usePeriodRecomondation(
    periodDateId,
    type
  );

  return loading ? (
    <LinearGradient
      colors={["#372B6B", "#232136"]}
      className="flex-1 lex justify-center items-center"
    >
      <Loading />
    </LinearGradient>
  ) : insightData ? (
    <LinearGradient colors={["#372B6B", "#232136"]} className="flex-1">
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        titleNode={
          <Text
            className="text-lg text-white"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Your AI Digest
          </Text>
        }
        centerTitle={true}
      />
      <ScrollView
        className="mt-16 flex-1"
        bounces={false}
        showsVerticalScrollIndicator={true}
      >
        <View className="p-5">
          <Text
            className="text-2xl text-white"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {insightData.name}
          </Text>
          <Text
            className="text-base text-white my-2"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {insightData.reason}
          </Text>
          {fetching ? (
            <BotTyping text="Sakhi is fetching data" textColor="#CFC7FF" />
          ) : (
            <Text
              className="text-sm pt-8 text-white/80"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {insightData.body}
            </Text>
          )}
        </View>
      </ScrollView>
      <View className="">
        <Prompts prompts={prompts} />
      </View>
    </LinearGradient>
  ) : null;
};

export default InsightDetailMain;
