import ImageWithURL from "@components/ImageWithURL";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";
import { saveFinalResponse } from "@hooks/chatbot/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import ListeningMic from "./ListeningMic";
import PlayAudio from "./audioPlayers/PlayAudio";

const MicSection = () => {
  const navigation = useNavigation();
  const {
    voiceState,
    recordedAudioPath,
    roomId,
    currentActiveMessage,
    onStartRecord,
    onStopRecord,
    onRetry,
  } = useChatVoiceStore(
    (state) => ({
      voiceState: state.voiceState,
      recordedAudioPath: state.recordAudioPath,
      currentActiveMessage: state.currentActiveMessage,
      roomId: state.roomId,
      onStartRecord: state.onStartRecord,
      onStopRecord: state.onStopRecord,
      onRetry: state.onRetry,
    }),
    shallow
  );
  const { uid } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
    }),
    shallow
  );

  const onDone = async () => {
    try {
      if (uid && currentActiveMessage && roomId) {
        await saveFinalResponse(
          "Audio File",
          "user",
          roomId,
          uid,
          currentActiveMessage,
          true,
          "Uploading",
          recordedAudioPath
        );
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert("Error in transcibing", `${e}`);
      console.log("error in transcibing", e);
    }
  };

  return (
    <View className="flex-1 w-full items-center pt-8">
      <Text className=" text-2xl font-bold text-[#59A9FF] mb-36">
        {voiceState === "Record"
          ? "Tap on Mic"
          : voiceState === "Listening"
          ? "Listening..."
          : voiceState === "Play"
          ? "Tap to Play"
          : ""}
      </Text>
      <View className=" absolute top-1/3 w-full flex items-center">
        {voiceState === "Record" ? (
          <TouchableOpacity className="" onPress={onStartRecord}>
            <View className=" w-24 aspect-square">
              <ImageWithURL
                resizeMode="contain"
                source={{
                  uri: "https://ik.imagekit.io/socialboat/mic_gd7OmEVPo.png?updatedAt=1701601677747",
                }}
              />
            </View>
          </TouchableOpacity>
        ) : voiceState === "Listening" ? (
          <ListeningMic />
        ) : voiceState === "Play" ? (
          <PlayAudio />
        ) : null}
      </View>

      {/* footer section */}

      <View className="absolute bottom-12 left-0 right-0 flex flex-row justify-center items-center">
        {voiceState === "Listening" ? (
          <TouchableOpacity onPress={onStopRecord}>
            <View className=" py-2 px-6 bg-[#FBFCFF] rounded-lg">
              <Text className=" text-[#875DFF] text-base font-medium">
                Done
              </Text>
            </View>
          </TouchableOpacity>
        ) : voiceState === "Play" ? (
          <View className=" flex flex-row">
            <TouchableOpacity onPress={onRetry} className="mr-2">
              <View className=" py-2 px-6 bg-[#FBFCFF1A] border border-white rounded-lg">
                <Text className="text-white text-base font-medium">Retry</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDone}>
              <View className=" py-2 px-6 bg-[#FBFCFF] rounded-lg">
                <Text className=" text-[#875DFF] text-base font-medium">
                  Done
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default MicSection;
