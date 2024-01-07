import { Platform, Text, View } from "react-native";
import ChatHeader from "./ChatHeader";
import ActionBar from "./ActionBar";
import Loading from "@components/loading/Loading";
import MessagesList from "./MessagesList";
import { useState } from "react";
import Confirmation from "./Confirmation";
import OnBoard from "./OnBoard";
import { KeyboardAvoidingView } from "react-native";
import { useSakhiV2 } from "@hooks/chatbot/V2/useSakhiV2";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import ErrorComp from "./ErrorComp";
import BotTypingV2 from "./BotTypingV2";
import useCreateRoomPlayerInstance from "@providers/chat/hook/useCreateRoomPlayerInstance";
// import { useFutureRecs } from "@hooks/dayRecs/useFutureRecs";
import { dayMS } from "@providers/period/periodStore";
// import { useDayRec } from "@hooks/dayRecs/useDayRec";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useFutureRecsChatbot } from "@hooks/dayRecs/useFutureRecsChatbot";

interface Props {}

const ChatRoomMain: React.FC<Props> = ({}) => {
  const { roomId } = useSakhiAIStore(
    (state) => ({
      roomId: state.room?.id,
    }),
    shallow
  );

  const [visible, setVisible] = useState<boolean>(false);

  const { uid } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
    }),
    shallow
  );

  const { nutritionBadgeId } = useUserStore(
    (state) => ({
      nutritionBadgeId: state.user?.nutritionBadgeId,
    }),
    shallow
  );
  // const { today } = useAuthContext();
  // useDayRec(today, "nutrition", nutritionBadgeId);
  useFutureRecsChatbot(Date.now() + 7 * dayMS, "nutrition", nutritionBadgeId);
  // useFutureRecs();

  const { handleNewUserMessage, sakhiState } = useSakhiV2();
  useCreateRoomPlayerInstance();

  return (
    <>
      {roomId ? (
        <>
          <ChatHeader />

          {sakhiState === "INIT" ? (
            <View className="flex-1 flex justify-center items-center">
              <Loading width="w-1/5" height="aspect-square" />
            </View>
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              contentContainerStyle={{ flex: 1 }}
              className="flex-1"
            >
              <View className="flex-1 relative z-0">
                <MessagesList />
                <BotTypingV2 />
                <ErrorComp />
                <OnBoard />
                <ActionBar
                  setVisible={setVisible}
                  onSend={handleNewUserMessage}
                />
                {uid && roomId ? (
                  <Confirmation
                    uid={uid}
                    roomId={roomId}
                    visible={visible}
                    setVisible={setVisible}
                  />
                ) : null}
              </View>
            </KeyboardAvoidingView>
          )}
        </>
      ) : (
        <>
          <View className="flex-1 flex justify-center items-center">
            <Text
              className="w-80 text-white text-xl text-center"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Unable to connect with Bot, Please try again in Soom time.
            </Text>
          </View>
        </>
      )}
    </>
  );
};

export default ChatRoomMain;
