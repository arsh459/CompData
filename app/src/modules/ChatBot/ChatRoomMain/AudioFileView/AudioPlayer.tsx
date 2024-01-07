import ImageWithURL from "@components/ImageWithURL";
import { pauseBtn, playBtn } from "@constants/imageKitURL";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { TouchableOpacity, View } from "react-native";

interface Props {
  audioUrl: string;
  id: string;
}

const AudioPlayer: React.FC<Props> = ({ audioUrl, id }) => {
  const { currentMessageAudio, setCurrentMessageAudio } = useChatVoiceStore(
    (state) => ({
      currentMessageAudio: state.currentMessageAudio,
      setCurrentMessageAudio: state.setCurrentMessageAudio,
    })
  );
  const playerBtnHandler = async () => {
    if (currentMessageAudio) {
      if (currentMessageAudio.id === id) {
        if (currentMessageAudio.audioState === "Playing") {
          setCurrentMessageAudio("Paused", id, audioUrl);
        } else if (currentMessageAudio.audioState === "Paused") {
          setCurrentMessageAudio("Resumed", id, audioUrl);
        }
      } else {
        setCurrentMessageAudio("Start", id, audioUrl);
      }
    } else {
      setCurrentMessageAudio("Start", id, audioUrl);
    }
  };
  return (
    <View className=" w-full p-2 flex flex-row">
      <TouchableOpacity onPress={playerBtnHandler} className=" w-8 h-8">
        <View className=" flex items-center justify-center w-8 h-8  bg-[#232136] rounded-full p-2">
          <ImageWithURL
            className=" w-4 h-4"
            resizeMode="contain"
            source={{
              uri:
                currentMessageAudio?.id === id &&
                currentMessageAudio?.audioState === "Playing"
                  ? pauseBtn
                  : playBtn,
            }}
          />
        </View>
      </TouchableOpacity>
      <ImageWithURL source={{uri: "https://ik.imagekit.io/socialboat/audiowave_21JdzlpMi.png?updatedAt=1702039242774"}} resizeMode="contain" className="flex-1 ml-2 h-8" />
      {/* <View className=" flex-1 border">
      <Text>Audio Progress</Text>
      </View> */}
    </View>
  );
};

export default AudioPlayer;
