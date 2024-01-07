import ImageWithURL from "@components/ImageWithURL";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { Text, View } from "react-native";
import { shallow } from "zustand/shallow";

const ListeningMic = () => {
  const { recordingDution } = useChatVoiceStore((state) => ({
    recordingDution: state.recordingDuration,
  }), shallow);
  return (
    <View className=" flex items-center">
      <View className=" w-24 aspect-square">
        <ImageWithURL
          resizeMode="contain"
          source={{
            uri: "https://ik.imagekit.io/socialboat/ListenMicNoBg_6zW5gj1qz.png?updatedAt=1701685054900",
          }}
        />
      </View>
      <Text className=" text-lg font-bold mt-4 text-[#59A9FF]">
        {recordingDution}
      </Text>
    </View>
  );
};

export default ListeningMic;
