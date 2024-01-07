import ImageWithURL from "@components/ImageWithURL";
import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import { TOKEN_LIMIT } from "../StartNewChatMain/utils";
const ErrorComp = () => {
  const { isError, isContextOver, errorMessage } = useSakhiAIStore(
    (state) => ({
      isError: state.sakhiState === "ERROR",
      isContextOver:
        (state.room?.usage?.total_tokens || 0) >
        (state.room?.tokenLimit || TOKEN_LIMIT),
      errorMessage: state.errorMessage,
    }),
    shallow
  );
  return (
    <>
      {isContextOver ? (
        <View className="bg-[#C1B7FF] flex flex-row items-center p-4">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Union_OlJbptt8j.png?updatedAt=1681372105100",
            }}
            className="w-7 aspect-square mr-4"
            resizeMode="contain"
          />
          <Text className="flex-1 text-[#362F66] text-xs font-bold">
            You have reached the limit of this chat. If you want to continue
            chatting, click below to start a new chat
          </Text>
        </View>
      ) : isError ? (
        <View className="bg-[#C1B7FF] flex flex-row items-center p-4">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Union_OlJbptt8j.png?updatedAt=1681372105100",
            }}
            className="w-7 aspect-square mr-4"
            resizeMode="contain"
          />
          <Text className="flex-1 text-[#362F66] text-xs font-bold">
            {errorMessage}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default ErrorComp;
