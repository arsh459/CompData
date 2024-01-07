import { View, useWindowDimensions, Text } from "react-native";
import { obBgOne, obBgTwo, obBgThree } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import Swiper from "@components/Swiper";
import SwiperCard from "./SwiperCard";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const OnBoardingMain = () => {
  const { width } = useWindowDimensions();

  const { signInRequest } = useAuthContext();

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Swiper
        pagination={true}
        dotWidth={width * 0.15}
        dotHeight={width * 0.02}
        activeDotWidth={width * 0.1}
        dotColor="#fff"
        alignItems="stretch"
      >
        <SwiperCard
          imgUrl={obBgOne}
          textNode={
            <Text
              className="text-white text-3xl iphoneX:text-3xl font-medium text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              Welcome to the{"\n"}
              <Text className="text-[#FF5970]">Fitness Games</Text>
            </Text>
          }
          showLogo={true}
        />
        <SwiperCard
          imgUrl={obBgTwo}
          textNode={
            <Text
              className="text-white text-3xl iphoneX:text-3xl font-medium text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              Unlock cards by
              <Text className="text-[#FF5970]"> AI{"\n"}powered </Text>
              workout tracking
            </Text>
          }
          resizeMode="contain"
        />
        <SwiperCard
          imgUrl={obBgThree}
          textNode={
            <Text
              className="text-white text-3xl iphoneX:text-3xl font-medium text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              <Text className="text-[#FF5970]"> Redeem Cards </Text>
              for{"\n"}exciting rewards
            </Text>
          }
          resizeMode="contain"
        />
      </Swiper>
      <View className="p-4 iphoneX:p-6">
        <StartButton
          onPress={() => {
            signInRequest(TEAM_ALPHABET_GAME);
            weEventTrack("onBoarding_clickGetStarted", {});
          }}
          title="Get Started"
          bgColor="bg-[#FF5970]"
          textColor="text-[#fff] "
          roundedStr="rounded-md"
          textStyle="py-2 text-center text-xl font-medium  rounded-md "
        />
      </View>
    </View>
  );
};

export default OnBoardingMain;
