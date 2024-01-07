import { TeamProvider } from "@providers/team/TeamProvider";
import Header from "@modules/Header";
import { useState } from "react";
import LeaderboardMain from "./LeaderboardMain";
import HeaderText from "@modules/Header/HeaderText";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import SvgIcons from "@components/SvgIcons";
import { getEndingIn } from "@modules/HomeScreen/BadgeScroll/utils";
import { useGameContext } from "@providers/game/GameProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import {
  InteractionProvider,
  useInteractionContext,
} from "@providers/InteractionProvider/InteractionProvider";
import Loading from "@components/loading/Loading";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { joinFitnessOnboardingCarousalData } from "./OnboardingExplainerV3";
import Swiper from "@components/Swiper";
import OnboardingCardRanking from "./OnboardingCardRanking";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getTeamId } from "@utils/utills";
import GradientText from "@components/GradientText";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface LeaderBoardOnboardingRoutingProps {
  heightFromBottom: number;
}

const LeaderboardOnboardingRouting: React.FC<
  LeaderBoardOnboardingRoutingProps
> = ({ heightFromBottom }) => {
  const { state } = useAuthContext();

  const participatingInGameWithTeam = useUserStore(
    ({ user }) => user?.participatingInGameWithTeam,
    shallow
  );

  const teamId = getTeamId(participatingInGameWithTeam, state.gameId);
  const { interactionStatus } = useInteractionContext();

  return interactionStatus ? (
    <View className=" flex-1">
      <TeamProvider selectedTeamId={teamId} initTeamMembers={3}>
        <Leaderboard
          heightFromBottom={heightFromBottom}
          isViewClick={teamId ? true : false}
          isRankingScreen={false}
        />
      </TeamProvider>
    </View>
  ) : (
    <View className="flex-1 flex justify-center items-center bg-[#100F1A]">
      <Loading width="w-12" height="h-12" />
    </View>
  );
};

const LeaderboardWrapper = () => {
  const tabBarHeight = useBottomTabBarHeight();
  useScreenTrack();
  return (
    <InteractionProvider>
      <LeaderboardOnboardingRouting heightFromBottom={tabBarHeight} />
    </InteractionProvider>
  );
};
interface LeaderboardProps {
  isViewClick: boolean;
  isRankingScreen: boolean;
  heightFromBottom: number;
}
export const Leaderboard: React.FC<LeaderboardProps> = ({
  isViewClick,
  heightFromBottom,
  isRankingScreen,
}) => {
  const { params, weekParams } = useGameContext();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const { timeStr } = getEndingIn(
    weekParams?.roundId,
    weekParams?.roundEndUnix,
    params?.currentRound ? [params.currentRound.id] : []
  );

  const onCalendarClick = () => {
    setIsOpen(true);
    weEventTrack("ranking_clickCalendar", {});
  };

  return (
    <>
      <Header
        titleNode={
          !isViewClick && !isRankingScreen ? (
            <GradientText
              text={"Join the Fitness Challenge"}
              colors={["#AD7BFF", "#7B92FF", "#5BFFFD"]}
              end={{ x: 0, y: 1 }}
              start={{ x: 1, y: 0 }}
              textStyle={{
                fontSize: 24,
                textAlign: "left",
                fontWeight: "700",
              }}
            />
          ) : isViewClick && !isRankingScreen ? (
            <View>
              <HeaderText text="Championship" />
              <Text
                className="text-[#909090] text-[10px] iphoneX:text-xs"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Ending In <Text className="text-[#FF5970]">{timeStr}</Text>
              </Text>
            </View>
          ) : isViewClick && isRankingScreen ? (
            <GradientText
              text={"LeaderBoard"}
              colors={["#AD7BFF", "#7B92FF", "#5BFFFD"]}
              end={{ x: 0, y: 1 }}
              start={{ x: 1, y: 0 }}
              textStyle={{
                fontSize: 24,
                textAlign: "left",
                fontWeight: "700",
              }}
            />
          ) : null
        }
        back={isRankingScreen}
        optionNode={
          isViewClick && !isRankingScreen ? (
            <View className="flex flex-row justify-center items-center">
              <TouchableOpacity
                className="w-6 aspect-square"
                onPress={onCalendarClick}
              >
                <SvgIcons iconType="calender" />
              </TouchableOpacity>
            </View>
          ) : null
        }
        headerColor="#100F1A"
        tone="dark"
      />
      {!isViewClick ? (
        <View className="bg-[#100F1A] ">
          <Swiper slideWidth={width * 0.85} spaceBetween={16} marginX={10}>
            {joinFitnessOnboardingCarousalData.map((item) => (
              <OnboardingCardRanking
                btnTxt={item.btnTxt}
                imgUri={item.imgUri}
                text={item.text}
                onGetStarted={() => {
                  weEventTrack("Ranking_createTeam", {});
                  navigation.navigate("CreateTeamEnterNameScreen");
                }}
                key={item.imgUri}
              />
            ))}
          </Swiper>
        </View>
      ) : null}
      <LeaderboardMain
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        heightFromBottom={heightFromBottom}
        isViewClick={isViewClick}
        isRankingScreen={isRankingScreen}
      />
    </>
  );
};

export default LeaderboardWrapper;
