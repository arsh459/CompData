import ImageWithURL from "@components/ImageWithURL";
// import useChatVoice from "@providers/chat/hook/useChatVoice";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

const PlayAudio = () => {
  const { recordedAudioState, recordingDuration, onPausePlay , onResumePlay, onStartPlay } =
    useChatVoiceStore((state) => ({
      recordedAudioState: state.recordedAudioState,
      recordingDuration: state.recordingDuration,
      onStartPlay: state.onStartPlay,
      onPausePlay: state.onPausePlay,
      onResumePlay: state.onResumePlay
    }));

  const startPausedHandler = () => {
    if (recordedAudioState === "Start") {
      onStartPlay();
    } else if (recordedAudioState === "Paused") {
      onResumePlay();
    }
  };
  if (recordedAudioState === "Start" || recordedAudioState === "Paused") {
    return (
      <TouchableOpacity
        onPress={startPausedHandler}
        className="flex items-center"
      >
        <View className=" w-24 aspect-square">
          <ImageWithURL
            resizeMode="contain"
            source={{
              uri: "https://ik.imagekit.io/socialboat/PlayAudio_GpCmjFc8J5.png?updatedAt=1701691936071",
            }}
          />
        </View>
        <Text className=" text-lg font-bold mt-4 text-[#59A9FF]">
          {recordingDuration}
        </Text>
      </TouchableOpacity>
    );
  }
  if (recordedAudioState === "Playing") {
    return (
      <TouchableOpacity onPress={onPausePlay} className="flex items-center">
        <View className=" w-24 aspect-square">
          <ImageWithURL
            resizeMode="contain"
            source={{
              uri: "https://ik.imagekit.io/socialboat/PauseAudio_uDWuys_js.png?updatedAt=1701750732531",
            }}
          />
        </View>
        <Text className=" text-lg font-bold mt-4 text-[#59A9FF]">
          {recordingDuration}
        </Text>
      </TouchableOpacity>
    );
  }
  return <></>;
  //   return (
  //     <TouchableOpacity onPress={onStartPlay} className="flex items-center">
  //       <View className=" w-24 aspect-square">
  //         <ImageWithURL
  //           resizeMode="contain"
  //           source={{
  //             uri: "https://ik.imagekit.io/socialboat/PlayAudio_GpCmjFc8J5.png?updatedAt=1701691936071",
  //           }}
  //         />
  //       </View>
  //       <Text className=" text-lg font-bold mt-4 text-[#59A9FF]">
  //           {audioDurationLeft}
  //         </Text>
  //     </TouchableOpacity>
  //   );
};

export default PlayAudio;
