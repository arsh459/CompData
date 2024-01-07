import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useUserContext } from "@providers/user/UserProvider";
// import Header from "@modules/Header";
import ImageWithURL from "@components/ImageWithURL";
import { StartPeriodJourneyBg } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const PeriodStartJourney = () => {
  const { user } = useUserContext();
  const [showWelcome, setShowWelcome] = useState(true);
  // const [marginTop, setmarginTop] = useState(0);
  const { height } = useWindowDimensions();
  const { navigate } = useNavigation();
  const bottomHeight = useBottomTabBarHeight();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (showWelcome) {
      const timerId = setTimeout(() => setShowWelcome(false), 2500);
      return () => clearTimeout(timerId);
    }
  }, []);
  return (
    <View className="flex-1 bg-[#232136]">
      {/* <Header
        back={true}
        tone="dark"
        headerColor="#232136"
        headerType="transparent"
        setHeaderHeight={setmarginTop}
      /> */}
      <ScrollView className="flex-1 " style={{ marginTop: top + 20 }}>
        {showWelcome ? (
          <View
            className="flex  items-center justify-center  "
            style={{ height: height * 0.7 }}
          >
            <View className="relative z-0">
              <View className="w-16 aspect-square bg-red-400 rounded-full  flex " />
              <View className="w-5 aspect-square bg-blue-400 absolute top-full rounded-full" />
            </View>
            <Text
              className="text-white pt-10    text-center  font-bold  text-3xl"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Welcome {user?.name}
              {"\n"} To Period tracker
            </Text>
          </View>
        ) : (
          <View className=" px-4 " style={{ height: height * 0.68 }}>
            <ImageWithURL
              source={{ uri: StartPeriodJourneyBg }}
              className="flex-1 mx-auto aspect-[368/698]"
            />
          </View>
        )}
      </ScrollView>
      {showWelcome ? null : (
        <View style={{ paddingBottom: bottomHeight }} className="px-4 mb-4">
          <StartButton
            title="Start tracking your periods "
            bgColor="bg-[#6D55D1]"
            textColor="text-white "
            roundedStr="rounded-2xl"
            textStyle="py-3 text-center text-lg   "
            fontFamily="Nunito-Bold"
            onPress={() => {
              navigate("PeriodOnboarding", { sec: "lastPeriodLength" });
              weEventTrack("periodStart_clickStart", {});
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PeriodStartJourney;
