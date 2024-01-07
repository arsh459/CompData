import { ChatMessage } from "@models/ChatBot/interface";
import { getMessageColor } from "@utils/chatbot/uttils";
import { format, isToday } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AudioPlayer from "./AudioPlayer";

interface Props {
  item: ChatMessage;
}
const AudioFileView: React.FC<Props> = ({ item }) => {
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  return (
    <View className=" flex justify-center py-2 items-end">
      <View
        className=" rounded-xl px-4 py-3 w-[65%] flex items-center"
        style={{
          backgroundColor: getMessageColor(item.role),
        }}
      >
        <View
          className={`rounded-xl ${
            showTranscript ? "bg-[#AD9FFF]" : ""
          } w-full `}
        >
          <AudioPlayer audioUrl={item.audioFile || ""} id={item.id} />
        </View>
        {showTranscript ? (
          <View className="w-full mt-2">
            <Text className=" text-left">{item.content}</Text>
          </View>
        ) : null}
      </View>
      <View
        className={` flex flex-row ${
          showTranscript ? " justify-end" : "justify-between"
        } mt-4 w-[65%]`}
      >
        {!showTranscript ? (
          <TouchableOpacity onPress={() => setShowTranscript(true)}>
            <Text className="text-xs text-[#19D6FF]">View Transcript</Text>
          </TouchableOpacity>
        ) : null}
        <Text className="text-white/60 text-xs ml-2">
          {isToday(item.createdOn)
            ? format(item.createdOn, "p")
            : format(item.createdOn, "dd MMM yy")}
        </Text>
      </View>
    </View>
  );
};

export default AudioFileView;
