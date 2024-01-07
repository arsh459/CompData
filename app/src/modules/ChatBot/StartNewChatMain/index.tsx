import Header from "@modules/Header";
import Background from "../Background";
import ImageWithURL from "@components/ImageWithURL";
import { infoBtnRing } from "@constants/imageKitURL";
import { Text, TouchableOpacity, View } from "react-native";
import RoomsList from "./RoomsList";
import SakhiGreet from "./SakhiGreet";
import { useUserRooms } from "@hooks/chatbot/useUserRooms";
import { useAuthContext } from "@providers/auth/AuthProvider";
import clsx from "clsx";
import Prompt from "./Prompt";
import Loading from "@components/loading/Loading";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StartNewChatMain = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { state } = useAuthContext();

  const { rooms, onNext, onDelete, loading } = useUserRooms(state.uid);

  const startNewChat = async () => {
    navigation.navigate("ChatRoom");
  };

  return (
    <Background>
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        optionNode={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SakhiExplainer", { goBack: false })
            }
          >
            <ImageWithURL
              source={{ uri: infoBtnRing }}
              className="w-5 aspect-square"
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading width="w-1/5" height="aspect-square" />
        </View>
      ) : (
        <View className="flex-1 pt-16">
          {rooms.length === 0 ? (
            <>
              <View
                className={clsx(
                  rooms.length === 0 && "flex-1",
                  "flex justify-center items-center py-8"
                )}
              >
                <SakhiGreet horizontal={rooms.length !== 0} />
              </View>
              <Prompt />
            </>
          ) : (
            <View className="flex-1">
              <RoomsList rooms={rooms} onNext={onNext} onDelete={onDelete} />
            </View>
          )}
          <TouchableOpacity
            onPress={startNewChat}
            className="rounded-xl flex flex-row justify-center items-center"
            style={{
              backgroundColor: "#FFFFFF",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              margin: 16,
              marginBottom: bottom || 16,
            }}
          >
            <Text className="text-[#6D55D1] text-3xl">+ </Text>
            <Text className="text-[#6D55D1] text-base text-center py-3">
              Start A New Chat
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Background>
  );
};

export default StartNewChatMain;
