import { View, Text, TouchableOpacity } from "react-native";
import GradientText from "@components/GradientText";
import MediaTile from "@components/MediaCard/MediaTile";
import ProgressBar from "@components/ProgressBar";
import LinearGradient from "react-native-linear-gradient";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useNavigation } from "@react-navigation/native";

import { format } from "date-fns";
import { useUserStore } from "@providers/user/store/useUserStore";
// import useDailyRewardProgress from "@hooks/rounds/useDailyRewardProgress";
// import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { RoundInterface } from "@models/Rounds/interface";
import { getChallengeProgress } from "../utills/getChallengeProgress";

interface Props {
  round: RoundInterface;
}

const ChallengeCard: React.FC<Props> = ({ round }) => {
  const navigation = useNavigation();

  const challengeJoined = useUserStore(({ user }) => user?.challengeJoined);

  const handleCtaPress = () => {
    if (challengeJoined) {
      weEventTrack("Home_goToChallenge", {});
      navigation.navigate("ChallengeScreen", { roundId: round.id });
    } else {
      navigation.navigate("ChallengeDetailScreen", { roundId: round.id });
      weEventTrack("Home_joinChallenge", {});
    }
  };

  const progress = getChallengeProgress(round);
  // const progress = 20;

  function challengeInfo(start?: number, end?: number) {
    const now: number = Date.now();
    if (start && end) {
      if (now >= start && now <= end) {
        return `(Ending on ${format(new Date(round?.end), "do MMM")})`;
      } else if (now < start) {
        return `(Starting on ${format(new Date(round?.start), "do MMM")})`;
      } else if (now > end) {
        return `(Challenge Ended)`;
      }
    } else if (end) {
      if (now > end) {
        return `(Challenge Ended)`;
      } else {
        return `(Ending on ${format(new Date(round?.end), "do MMM")})`;
      }
    } else if (start) {
      if (now < start) {
        return `(Starting on ${format(new Date(round?.start), "do MMM")})`;
      } else {
        return `(Started on ${format(new Date(round?.start), "do MMM")})`;
      }
    } else {
      return "";
    }
  }

  const value = challengeJoined
    ? {
        text: "View Challenge",
        showProgress: true,
      }
    : {
        text: "Join Challenge",
        showProgress: false,
      };

  return (
    <LinearGradient
      colors={["#802CA7", "#5B2A73"]}
      className="w-full px-4 rounded-2xl aspect-[331/156] flex flex-row overflow-hidden"
      end={{ x: 0, y: 0.5 }}
      start={{ x: 1, y: 0.5 }}
    >
      <View className="flex-1 py-4 flex justify-between">
        <View className="">
          <GradientText
            text={round?.name || ""}
            colors={["#D197FF", "#A2A0FF"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            textStyle={{
              fontFamily: "Nunito-Bold",
              fontSize: 22,
              lineHeight: 24,
            }}
          />
          <Text
            className="text-white/70 text-xs iphoneX:text-sm pt-1"
            style={{ fontFamily: "Poppins-Light" }}
          >
            {challengeInfo(round.start, round.end)}
          </Text>
        </View>
        <View className="px-2 w-3/5 flex items-center justify-center">
          {value?.showProgress ? (
            <>
              <ProgressBar
                height={1}
                progress={progress}
                // showLable="below"
                activeColor="#D197FF"
                inActiveColor="#D197FF33"
                lableText={`${progress}% Completed`}
                hideArrow={true}
                textColor="#D197FF"
                textStyle="text-xs text-center font-[Nunito]"
                // textPositioningLeft={progress < 10 ? 6 : progress < 100 ? 88 : 92}
              />
              <View className="w-full mt-1 ">
                <Text
                  className="text-left text-[#D197FF] text-[9px] iphoneX:text-xs"
                  style={{ fontFamily: "Nunito-Regular" }}
                >{`${progress}% Completed`}</Text>
              </View>
            </>
          ) : null}
        </View>
        {/* 85 */}
        {/* 88 */}
      </View>
      <View className="w-[45%] aspect-[400/450] flex flex-col items-end justify-end relative z-0">
        {round?.img ? (
          <MediaTile fluid={true} fluidResizeMode="cover" media={round?.img} />
        ) : null}
        <View className="flex flex-row justify-center w-full absolute bottom-5 z-40">
          <TouchableOpacity
            onPress={handleCtaPress}
            className="bg-white flex flex-row items-center rounded-xl p-2 px-3"
          >
            <Text
              numberOfLines={1}
              className="flex-1 text-[#6C2C8B] text-xs whitespace-nowrap"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {value?.text}
            </Text>
            <View className="w-2" />
            <View className="w-2.5 aspect-square">
              <ArrowIcon direction="right" color="#6C2C8B" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChallengeCard;
