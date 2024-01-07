// import { UserProvider } from "@providers/user/UserProvider";
// import JoinBoatMain from "@modules/JoinBoatMain";
import { sectionTypes } from "@modules/JoinBoatMain/hooks/useSection";
// import { GameProvider } from "@providers/game/GameProvider";
// import { TeamProvider } from "@providers/team/TeamProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
// import Header from "@modules/Header";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { socialboatSakhiLogoColor2 } from "@constants/imageKitURL";
import clsx from "clsx";
// import { STUDENT_OLYMPICS, TEAM_ALPHABET_GAME } from "@constants/gameStats";
// import { useDNContext } from "@providers/dnLinks/DNProvider";

export interface JoinBoatParams {
  section: sectionTypes;
  // gameId?: string;
  teamId?: string;
}

const LoadingSection = () => {
  const [text, setText] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => setText((p) => p + 1), 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View className="flex-1  bg-[#100F1A]">
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
        animated={true}
      />
      <View className="flex-1">
        <View className="flex flex-1 justify-center items-center">
          <Image
            source={{ uri: socialboatSakhiLogoColor2 }}
            className="w-4/5 max-w-xs aspect-square"
            resizeMode="contain"
          />
          <View className="flex flex-row">
            <Text
              style={{ fontFamily: "BaiJamjuree-Medium" }}
              className="text-white text-left text-2xl iphoneX:text-3xl pb-8"
            >
              Loading
            </Text>
            <View className="flex flex-row pl-1">
              {[1, 2, 3].map((item) => {
                const current = (text % 3) + 1;
                return (
                  <Text
                    key={`dot-${item}`}
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                    className={clsx(
                      item <= current ? "text-white" : "text-black",
                      "text-left text-2xl iphoneX:text-3xl pl-1"
                    )}
                  >
                    .
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoadingSection;
