import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Background from "@modules/ChatBot/Background";
import { useRoute } from "@react-navigation/native";
import Loading from "@components/loading/Loading";
import { View } from "react-native";
import ChatRoomMain from "@modules/ChatBot/ChatRoomMain";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useChatRoomV2 } from "@hooks/chatbot/V2/useChatRoomV2";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import { useRoomFromRealtimeDB } from "@hooks/chatbot/useRoomFromRealtimeDB";
import { useRoomStatus } from "@hooks/chatbot/useRoomStatus";

export interface ChatRoomProps {
  roomId?: string;
  initialPrompt?: string;
}

const ChatRoom = () => {
  const route = useRoute();
  const params = route.params as ChatRoomProps;
  const uid = useUserStore((state) => state.user?.uid, shallow);
  const { resetStore } = useSakhiAIStore(
    (state) => ({
      resetStore: state.resetStore,
    }),
    shallow
  );

  const { loading } = useChatRoomV2(uid, params?.roomId, params?.initialPrompt);
  useRoomFromRealtimeDB();
  useRoomStatus();
  useScreenTrack();

  useEffect(() => {
    return () => {
      resetStore();
    };
  }, [uid, params?.roomId, params?.initialPrompt]);

  return (
    <Background>
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading width="w-1/5" height="aspect-square" />
        </View>
      ) : (
        <ChatRoomMain />
      )}
    </Background>
  );
};

export default ChatRoom;
