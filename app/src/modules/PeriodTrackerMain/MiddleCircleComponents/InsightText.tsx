import ImageWithURL from "@components/ImageWithURL";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { chatAiIcon } from "@constants/imageKitURL";
import { getInsightRoomId } from "@modules/ChatBot/StartNewChatMain/utils";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, TouchableOpacity, View } from "react-native";
import { useSymptomIntakeStore } from "../SymptomIntake/store/SymptomIntakeStore";
import { useRef } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

interface Props {
  insight?: string;
  prompt?: string;
  insightTextColor?: string;
  insightBgColor?: string;
}

const InsightText: React.FC<Props> = ({
  insight,
  insightBgColor,
  insightTextColor,
  prompt,
}) => {
  const { state } = useAuthContext();
  const navigation = useNavigation();
  const { config } = useConfigContext();
  const { setMeasurAIPre, onShowQu } = useSymptomIntakeStore();
  const refAI = useRef<View>(null);

  const onInsightChatRoomPress = async () => {
    if (state.uid && prompt && config?.sakhiAIPrompt) {
      try {
        const roomId = await getInsightRoomId(
          state.uid,
          prompt,
          config.sakhiAIPrompt
        );

        navigation.navigate("ChatRoom", { roomId });
      } catch (error: any) {
        crashlytics().recordError(error);
        console.log("onInsightChatRoomPress", error);
      }
    }

    weEventTrack("period_clickMainInsight", {});
  };

  const getMeasure = () => {
    if (refAI.current) {
      refAI.current.measure((fx, fy, width, height, px, py) => {
        setMeasurAIPre({ fx, fy, width, height, px, py });
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={onInsightChatRoomPress}
      className="mx-auto p-3 px-4 rounded-xl min-w-[150px] max-w-[200px] bg-white/25"
    >
      <View className="flex flex-row justify-between items-center pb-2">
        <TouchableOpacity
          onPress={onShowQu}
          className="flex flex-row items-center"
        >
          <View ref={refAI} collapsable={false} onLayout={getMeasure}>
            <ImageWithURL
              source={{ uri: chatAiIcon }}
              className="w-5 aspect-[1.5]"
              resizeMode="contain"
            />
          </View>
          <Text
            className="text-white text-xs px-1"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Sakhi
          </Text>
        </TouchableOpacity>
        <View className="w-4 aspect-square bg-white/20 rounded-full p-1">
          <ArrowIcon direction="right" color="#FFFFFF" />
        </View>
      </View>
      <Text
        className="text-white text-xs leading-[14px]"
        style={{
          fontFamily: "Nunito-Regular",
          // color: insightTextColor,
        }}
      >
        {insight}
      </Text>
    </TouchableOpacity>
  );
};

export default InsightText;
