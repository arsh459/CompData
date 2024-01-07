import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon, infoBtnRing } from "@constants/imageKitURL";
import { useSakhiUserPrompts } from "@hooks/chatbot/useSakhiUserPrompts";
import { handleResumeChatWithPrompt } from "@modules/ChatBot/StartNewChatMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";

const ScrollableItemChat = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { state } = useAuthContext();
  const { prompts, id } = useSakhiUserPrompts();

  const onNewUserPrompt = async (promptMessage: string) => {
    if (id && state.uid) {
      await handleResumeChatWithPrompt(state.uid, id, promptMessage);
    }

    // chat room
    navigation.navigate("ChatRoom", {
      initialPrompt: promptMessage,
      roomId: id,
    });
  };

  if (prompts.length) {
    return (
      <View className="bg-[#5E45C833] py-4 mt-8">
        <View className=" flex flex-row items-center justify-between px-4 pb-4">
          <View className="flex flex-row items-center">
            <ImageWithURL className="w-8 h-5" source={{ uri: chatAiIcon }} />
            <Text
              className="text-white pl-2 text-sm iphoneX:text-base"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Ask Sakhi AI
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SakhiExplainer", { goBack: false })
            }
          >
            <ImageWithURL
              source={{ uri: infoBtnRing }}
              className="w-4 aspect-square"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {prompts?.map((item, index) => {
            return (
              <Pressable
                onPress={() => onNewUserPrompt(item)}
                className={index === 0 ? "px-4" : "pr-4"}
                style={{ width: width * 0.6 }}
                key={`${item}_${index}`}
              >
                <View className="w-full bg-[#8461DC] p-4 rounded-2xl border border-white/10">
                  <Text
                    className="text-[#f1f1f1] text-sm "
                    style={{ fontFamily: "Nunito-Regular" }}
                  >
                    {item}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  } else {
    return null;
  }
};

export default ScrollableItemChat;
