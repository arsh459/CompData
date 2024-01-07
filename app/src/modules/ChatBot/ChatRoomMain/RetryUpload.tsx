import ImageWithURL from "@components/ImageWithURL";
import { reUploadIcon } from "@constants/imageKitURL";
import { updateLastUserMessage } from "@hooks/chatbot/utils";
import { ChatMessage } from "@models/ChatBot/interface";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { Text, TouchableOpacity, View } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {
  item: ChatMessage;
}

const RetryUpload: React.FC<Props> = ({ item }) => {
  const { currentActiveMessage, roomId } = useChatVoiceStore(
    (state) => ({
      currentActiveMessage: state.currentActiveMessage,
      roomId: state.roomId,
    }),
    shallow
  );
  const { uid } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
    }),
    shallow
  );

  const onRetryHandler = () => {
    const updatedMessage: ChatMessage = {
      ...item,
      transcribeStatus: "Uploading",
    };
    if (uid && currentActiveMessage?.id && roomId) {
      updateLastUserMessage(
        currentActiveMessage.messages,
        uid,
        roomId,
        currentActiveMessage.id,
        updatedMessage
      );
    }
  };

  return (
    <View className=" flex justify-center py-2 items-end">
      <View className=" rounded-xl px-4 py-3 max-w-[75%] flex flex-row items-center bg-[#5740DF4D] border border-[#C8B5FF]">
        <TouchableOpacity onPress={onRetryHandler}>
          <ImageWithURL
            source={{ uri: reUploadIcon }}
            resizeMode="contain"
            className=" w-4 h-4"
          />
        </TouchableOpacity>
        <Text className=" text-sm text-[#C8B5FF] ml-2">Retry Uploading</Text>
      </View>
      <Text className="text-[#FF8293] text-xs mt-4">Uploading Failed</Text>
    </View>
  );
};

export default RetryUpload;
