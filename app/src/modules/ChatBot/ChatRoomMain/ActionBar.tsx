import ImageWithURL from "@components/ImageWithURL";
import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { View, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shallow } from "zustand/shallow";
import { TOKEN_LIMIT } from "../StartNewChatMain/utils";
// import AudioRecorderPlayer from "react-native-audio-recorder-player";
// import {
//   check,
//   PERMISSIONS,
//   request,
// } from "react-native-permissions";
// import { RNS3 } from "react-native-upload-aws-s3";
// import { useUserStore } from "@providers/user/store/useUserStore";
// import {
//   BUCKET,
//   S3_AWS_REGION,
//   SECRET_KEY,
//   ACCESS_KEY,
//   OPENAI_API_KEY,
// } from "react-native-dotenv";
import "react-native-get-random-values";
// import { v4 as uuid } from "uuid";
// import { transcribeAudio } from "../utils";
import { chatMic } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
// import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";

interface Props {
  setVisible: (val: boolean) => void;
  onSend: (toSendMessage: string) => void;
}

const ActionBar: React.FC<Props> = ({ setVisible, onSend }) => {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [padding, setPadding] = useState<number>(bottom);
  const [newMessageTyped, setNewMessageTyped] = useState<string>("");
  const navigation = useNavigation();
  const { sakhiState, progress } = useSakhiAIStore(
    (state) => ({
      sakhiState: state.sakhiState,
      progress:
        (state.room?.usage?.total_tokens || 0) /
        (state.room?.tokenLimit || TOKEN_LIMIT),
    }),
    shallow
  );

  useEffect(() => {
    if (Platform.OS === "android") {
      setPadding(8);
    } else if (bottom) {
      const listener = Keyboard.addListener("keyboardWillShow", () => {
        setPadding(8);
      });

      const listener2 = Keyboard.addListener("keyboardWillHide", () => {
        setPadding(bottom);
      });

      return () => {
        listener.remove();
        listener2.remove();
      };
    }
  }, [bottom]);

  const onSendFinal = () => {
    setNewMessageTyped("");
    onSend(newMessageTyped);
    weEventTrack("sakhi_sendMessage", {});
  };

  const onMicClick = () => {
    navigation.navigate("ChatVoiceScreen");
    weEventTrack("sakhi_chatVoiceMic", {});
  };

  return (
    <View style={{ paddingBottom: padding }} className="bg-[#343150] px-4 pt-2">
      <View className="flex flex-row items-end">
        <TouchableOpacity
          onPress={onMicClick}
          disabled={
            sakhiState === "TYPING" ||
            sakhiState === "FETCHING" ||
            sakhiState === "ANALYZING"
          }
          style={{
            opacity:
              sakhiState === "TYPING" ||
              sakhiState === "FETCHING" ||
              sakhiState === "ANALYZING"
                ? 0.4
                : 1,
          }}
        >
          <ImageWithURL
            source={{
              uri: chatMic,
            }}
            className="w-8 aspect-square"
            resizeMode="contain"
          />
        </TouchableOpacity>
        {progress >= 1 ? (
          <>
            <View className="flex-1" />
            <TouchableOpacity className="bg-[#6D55D1] rounded-lg flex flex-row justify-center items-center px-4">
              <Text
                className="text-white text-2xl"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                +{" "}
              </Text>
              <Text
                className="text-white text-sm text-center py-2"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Start A New Chat
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              multiline={true}
              scrollEnabled={true}
              value={newMessageTyped}
              cursorColor="#C9C2F2"
              onChangeText={setNewMessageTyped}
              placeholder="Send a message"
              placeholderTextColor="#67648A"
              className="flex-1 h-full text-white mx-3 px-3 border border-[#C9C2F2] rounded-2xl"
              style={{
                fontSize: 16,
                textAlignVertical: "center",
                paddingVertical: 0,
                marginVertical: 0,
                maxHeight: height * 0.2,
              }}
            />

            <TouchableOpacity
              disabled={
                sakhiState === "TYPING" ||
                sakhiState === "FETCHING" ||
                sakhiState === "ANALYZING" ||
                newMessageTyped.length === 0
              }
              onPress={onSendFinal}
            >
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group_1624_uaPMNGfbn.png?updatedAt=1681307126817",
                }}
                style={{
                  opacity:
                    sakhiState === "TYPING" ||
                    sakhiState === "FETCHING" ||
                    sakhiState === "ANALYZING" ||
                    newMessageTyped.length === 0
                      ? 0.4
                      : 1,
                }}
                className="w-8 aspect-square"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
    // </>
  );
};

export default ActionBar;
