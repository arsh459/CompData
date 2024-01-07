import { ChatMessage } from "@models/ChatBot/interface";
import Clipboard from "@react-native-clipboard/clipboard";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import { getMessageColor } from "../../../utils/chatbot/uttils";
import clsx from "clsx";
import { format, isToday } from "date-fns";
import { memo } from "react";
import ImageWithURL from "@components/ImageWithURL";
import MarkdownWrapper, {
  markdownStylesAssistant,
  markdownStylesGeneral,
  markdownStylesUser,
} from "./MarkDownWrapper";

interface Props {
  item: ChatMessage;
}

const ChatBubble: React.FC<Props> = ({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item.content);
    if (Platform.OS === "android") {
      ToastAndroid.show("Text copied to clipboard", ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      Alert.alert("Text copied to clipboard");
    }
  };

  return (
    <View
      className={clsx(
        "flex justify-center py-2",
        item.role === "assistant"
          ? "items-start"
          : item.role === "user"
          ? "items-end"
          : "items-center"
      )}
    >
      <View
        className={clsx(
          "flex items-center",
          item.role === "user" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <View
          className={clsx(
            "rounded-xl px-4 py-3",
            item.role === "system" ? "w-full" : "max-w-[75%]"
          )}
          style={{
            backgroundColor: getMessageColor(item.role),
          }}
        >
          <MarkdownWrapper
            style={
              item.role === "assistant"
                ? markdownStylesAssistant
                : item.role === "user"
                ? markdownStylesUser
                : markdownStylesGeneral
            }
          >
            {item.content}
          </MarkdownWrapper>
        </View>
        {item.role !== "system" && !item.buttonParams ? (
          <TouchableOpacity onPress={copyToClipboard} className={"mx-3"}>
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Vector_zaCH4LgIa.png?updatedAt=1684913448893",
              }}
              className="w-4 aspect-square"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text className="text-white/60 text-xs mt-4">
        {isToday(item.createdOn)
          ? format(item.createdOn, "p")
          : format(item.createdOn, "dd MMM yy")}
      </Text>
    </View>
  );

  // return <View />;
};

export default memo(ChatBubble);
