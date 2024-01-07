import { ChatMessage } from "@models/ChatBot/interface";
import { FlashList } from "@shopify/flash-list";
import ChatBubble from "./ChatBubble";
import { FlatList, Platform, View } from "react-native";
import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import { shallow } from "zustand/shallow";
import AudioChatBubble from "./AudioChatBubble";
import ButtonView from "./ButtonView";
import { getButtonParams } from "./Callbacks/utils";

const MessagesList = () => {
  const { messages } = useSakhiAIStore(
    (state) => ({
      messages: state.messages,
    }),
    shallow
  );

  const renderItem = ({
    item,
  }: // index,
  {
    item: ChatMessage;
    index: number;
  }) => {
    if (item.audioTag) {
      return <AudioChatBubble item={item} />;
    } else if (item.buttonParams) {
      let buttonParameters = item.buttonParams;
      const { screenName, screenParams, buttonText } =
        getButtonParams(buttonParameters);
      return (
        <>
          <ButtonView
            screenParams={{
              route: screenName,
              params: { [screenName]: screenParams },
            }}
            buttonText={buttonText}
            item={item}
          />
        </>
      );
    } else {
      return (
        <>
          {item.tool_call_id ||
          (item.tool_calls && !item.content) ||
          item.role === "tool" ? (
            <></>
          ) : (
            <ChatBubble item={item} />
          )}
        </>
      );
    }
  };

  // return <View />;

  const keyExtractor = (item: ChatMessage) => item.id;
  return (
    <View className="flex-1">
      {Platform.OS === "android" ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          bounces={false}
          inverted={true}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
      ) : (
        <FlashList
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={725}
          showsVerticalScrollIndicator={false}
          bounces={false}
          inverted={true}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
      )}
    </View>
  );
};

export default MessagesList;
