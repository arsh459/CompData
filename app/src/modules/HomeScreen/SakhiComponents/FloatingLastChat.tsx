import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon } from "@constants/imageKitURL";
import { Room } from "@models/ChatBot/interface";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import FloatingContainer from "./FloatingContainer";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { onRoomPopupRemove } from "../utills/guidedOnboardUtils";

interface FloatingProps {
  offsetBottom?: number;
  onHide: () => void;
  lastRoom?: Room;
}

const FloatingLastChat: React.FC<FloatingProps> = ({
  offsetBottom,
  onHide,
  lastRoom,
}) => {
  const navigation = useNavigation();
  const { state } = useAuthContext();

  const onViewChats = () => {
    if (state.uid && lastRoom?.id) {
      onRoomPopupRemove(state?.uid, lastRoom?.id);
    }
    navigation.navigate("StartNewChat");
  };

  const onResumeChat = () => {
    if (state.uid && lastRoom?.id) {
      onRoomPopupRemove(state?.uid, lastRoom?.id);
    }

    navigation.navigate("ChatRoom", { roomId: lastRoom?.id });
  };

  return lastRoom ? (
    <FloatingContainer
      cta1Text="View All Chats"
      cta2Text="Resume Chat"
      cta1Press={onViewChats}
      cta2Press={onResumeChat}
      offsetBottom={offsetBottom}
      onHide={onHide}
    >
      <Text
        className="text-[#654AD1] text-sm"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Sakhi AI
      </Text>
      <Text
        numberOfLines={1}
        className="text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Resume: {lastRoom.title ? lastRoom.title : "Last Chat"}
      </Text>
      <View className="flex flex-row items-end pt-4">
        <ImageWithURL
          source={{ uri: chatAiIcon }}
          className="w-8 aspect-[32/20]"
          resizeMode="contain"
        />
        <View className="bg-[#D7D5E2] ml-2 mr-20 px-4 py-2 rounded-lg rounded-bl-none">
          <Text
            numberOfLines={2}
            className="text-[#232136] text-xs"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {lastRoom.lastMessage?.slice(0, 80)}
          </Text>
        </View>
      </View>
    </FloatingContainer>
  ) : null;
};

export default FloatingLastChat;
