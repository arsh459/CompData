import ImageWithURL from "@components/ImageWithURL";
import Header from "@modules/Header";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Fitpoint from "./Fitpoint";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Goal from "./Goal";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const TodayFpMain = () => {
  const { top, bottom } = useSafeAreaInsets();

  const onWA = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to know about my goals")}`
    );
    weEventTrack("click_wa", {});
  };

  return (
    <View className="h-full flex flex-col">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame_1762__1__A8UFFYh0S.png?updatedAt=1685449228580",
        }}
        className="absolute -left-1 -right-1 -top-1 -bottom-1"
      />
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        optionNode={
          <TouchableOpacity
            onPress={onWA}
            className="flex flex-row items-center rounded-full bg-white backdrop-blur-3xl px-4 py-1"
            style={{
              backgroundColor: "#FFFFFF",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          >
            <Text className="text-[#1C1C1C] text-sm font-medium">
              Talk to Coach
            </Text>
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Arrow_137_MJE_BtTvd.png?updatedAt=1686137643237",
              }}
              className="w-3 aspect-1 ml-1"
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
        contentContainerStyle={{
          paddingTop: (top || 16) + 50,
          paddingBottom: bottom || 16,
        }}
      >
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1777_rqQ4LDyf8.png?updatedAt=1685793133967",
          }}
          className="w-full aspect-[330/280]"
          resizeMode="contain"
        />
        <Fitpoint />
        <View className="w-4 aspect-square" />
        <Goal />
      </ScrollView>
    </View>
  );
};

export default TodayFpMain;
