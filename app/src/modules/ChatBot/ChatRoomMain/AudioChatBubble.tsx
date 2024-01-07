import { ChatMessage } from "@models/ChatBot/interface";
import { View, Text } from "react-native";
import { memo } from "react";
import { getMessageColor } from "@utils/chatbot/uttils";
import UploadSpin from "@components/Upload/UploadSpin";
import { format, isToday } from "date-fns";
import AudioFileView from "./AudioFileView/AudioFileView";
import RetryUpload from "./RetryUpload";

interface Props {
  item: ChatMessage;
}

const AudioChatBubble: React.FC<Props> = ({ item }) => {
  if (item.transcribeStatus === "Uploading") {
    return (
      <View className=" flex justify-center py-2 items-end">
        <View
          className=" rounded-xl px-4 py-3 max-w-[75%] flex flex-row items-center"
          style={{
            backgroundColor: getMessageColor(item.role),
          }}
        >
          <UploadSpin />
          <Text className=" text-sm text-[#232136] ml-2">
            Audio Uploading...
          </Text>
        </View>
        <Text className="text-white/60 text-xs mt-4">
          {isToday(item.createdOn)
            ? format(item.createdOn, "p")
            : format(item.createdOn, "dd MMM yy")}
        </Text>
      </View>
    );
  }
  if (item.transcribeStatus === "Failed") {
    return <RetryUpload item={item} />;
  }
  if (item.transcribeStatus === "Success") {
    return <AudioFileView item={item} />;
  }
  return null;
};

export default memo(AudioChatBubble);
