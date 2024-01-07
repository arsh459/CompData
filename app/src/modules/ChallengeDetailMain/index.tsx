import { View, ScrollView, Text } from "react-native";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import BenefitsAndReward from "./BenefitsAndReward";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { LinearGradient } from "expo-linear-gradient";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useRoundContext } from "@providers/round/RoundProver";
import { joinChallengeFunc } from "./utils";
import { useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";
import HowToPlay from "./HowToPlay";
import TestimonialsCarousal from "@modules/HomeScreen/TestimonialsCarousal";
import MediaCard from "@components/MediaCard";

interface Props {}

const ChallengeDetailMain: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const { roundId } = useRoundContext();

  const { uid, challengeJoined, round } = useUserStore((st) => {
    return {
      uid: st.user?.uid,
      challengeJoined: st.user?.challengeJoined,
      round: st.currentRound,
    };
  }, shallow);

  const onCtaPress = async () => {
    if (uid && !challengeJoined) {
      try {
        setLoading(true);
        await joinChallengeFunc(uid);
        weEventTrack("ChallengeScreen_clickJoin", {
          name: round?.name ? round.name : "no name",
        });
        setLoading(false);
        navigation.navigate("ChallengeScreen", { roundId });
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        weEventTrack("ChallengeScreen_clickJoinError", {
          name: round?.name ? round.name : "no name",
          error: JSON.stringify(error),
        });
      }
    } else {
      navigation.navigate("ChallengeScreen", { roundId });
    }

    weEventTrack("ChallengeScreen_goToChallenge", {});
  };

  // const isFocus = useIsFocused();

  return (
    <View className="w-full h-full bg-[#232136] flex-1">
      {loading ? <LoadingModal width="w-12" height="h-12" /> : null}
      <Header
        back={true}
        tone="dark"
        headerColor="#232136"
        // headerType="transparent"
        titleNode={
          <Text
            className="text-white text-sm iphoneX:text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {round?.name || "SB Challenge"}
          </Text>
        }
      />
      <View
        style={{ flex: 1 }}
        className="bg-[#232136] relative z-0 overflow-hidden"
      >
        {/* <View className="absolute left-0 right-0 w-full aspect-[380/400]  pb-2 overflow-hidden">
          {round?.img ? (
            <MediaTile
              fluidResizeMode="cover"
              fluid={true}
              roundedStr=""
              placeholderWidth={400}
              placeholderHeight={300}
              media={round?.img}
            />
          ) : null}
        </View> */}
        <ScrollView
          className="flex-1 rounded-t-3xl"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient colors={["#23213600", "#232136C0", "#232136"]}>
            {/* <View className="h-1/4 border border-white"> */}
            <View className="w-full aspect-[375/201] pb-8">
              <MediaCard
                fluid={true}
                thumbnail={
                  round?.reelThumbnail ? round.reelThumbnail : round?.img
                }
                playbackId={round?.playbackId}
                autoplay={true}
                // forcePause={!isFocus}
                media={
                  round?.reelMedia
                    ? round.reelMedia
                    : round?.reelThumbnail
                    ? round.reelThumbnail
                    : round?.img
                }
              />
              {/* </View> */}
            </View>
            <>
              <View className="bg-[#343150] flex-1 flex flex-row items-center mx-4 rounded-2xl p-4 ">
                <View className="">
                  <Text
                    className="text-xs iphoneX:text-sm text-white pb-2"
                    style={{
                      fontFamily: "BaiJamjuree-SemiBold",
                    }}
                  >
                    About
                  </Text>
                  <Text
                    className="text-white/60 text-xs whitespace-pre-wrap"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    {round?.description}
                  </Text>
                </View>
              </View>
              {/* <View className="bg-[#343150]   flex flex-row items-center m-4 rounded-2xl p-4">
                <View className="w-1/4 aspect-[79/83] ">
                  <View className="w-full">
                    <MediaTile fluid={true} media={award?.img} />
                  </View>
                </View>
                <View className=" pl-2 h-full w-3/4">
                  <Text
                    className="text-base text-white pb-2"
                    style={{
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    {award?.name}
                  </Text>
                  <Text
                    // numberOfLines={4}
                    className="text-white/60 text-[10px] "
                    style={{ fontFamily: "Poppins-Light" }}
                  >
                    {award?.description}
                  </Text>
                </View>
              </View> */}
            </>
            <View className="p-4 pt-8">
              <HowToPlay howToPlay={round?.steps} />
            </View>
            <View className="p-4">
              <BenefitsAndReward benefits={round?.benefits} />
            </View>

            <View className="">
              <TestimonialsCarousal />
            </View>

            <View className="h-20 " />
          </LinearGradient>
        </ScrollView>

        <View className="p-4 bg-[#6D55D1]/50 m-4 rounded-2xl">
          <StartButton
            title={challengeJoined ? "Go To Challenge" : "Start Challenge"}
            bgColor="bg-[#6D55D1]"
            textColor="text-white"
            fontFamily="Nunito-Bold"
            textStyle="py-3 text-center text-base"
            onPress={onCtaPress}
          />
        </View>
      </View>
    </View>
  );
};

export default ChallengeDetailMain;
