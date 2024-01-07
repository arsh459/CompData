import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "@components/Swiper";
import { iPhoneX } from "@constants/screen";
import NewBadge from "../NewHome/NewBadge";
import NewBadgeGolden from "../NewHome/NewBadgeGolden";
import StartButton from "../NewHome/StartButton";
import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { Badge } from "@models/Prizes/Prizes";
import { useGameContext } from "@providers/game/GameProvider";
import { getBadgeProgress, getEndingIn, getIndependedKPI } from "./utils";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { getCurrentTeamPts, getSelectedSprintId } from "../NewHome/utils";
import { useNavigation } from "@react-navigation/native";
// import { getTeamId } from "@utils/utills";
// import { useUserContext } from "@providers/user/UserProvider";
import clsx from "clsx";

const BadgeScroll = () => {
  // const { user } = useUserContext();
  const navigation = useNavigation();

  const { width: WIDTH } = useWindowDimensions();
  const { weekParams, game, params } = useGameContext();
  // const teamId = getTeamId(user, game?.id);

  const { coachRank } = useTeamProgressContext();

  const {
    badges,
    // setSwipedBadge, swipedBadge
  } = useBadgeContext();
  const currentBadge = badges[0] as Badge | undefined;

  const onStartGame = () => {
    navigation.navigate("Workout", {
      // gameId: game ? game.id : "",
      // teamId: teamId ? teamId : "",
      badgeId: currentBadge?.id ? currentBadge?.id : "",
    });
  };
  const bg =
    currentBadge?.badgeId === "independent"
      ? require("../../../../assets/images/bkgb.png")
      : currentBadge?.badgeId === "relative"
      ? require("../../../../assets/images/bkgg.png")
      : "";

  return (
    <>
      <Image
        source={bg}
        className="w-full absolute"
        style={{ aspectRatio: 376 / 535 }}
      />
      {!params?.currentRound && params?.daysElapsed ? (
        <View className="flex justify-center items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-2xl text-center"
          >
            {game?.name} has ended
          </Text>
        </View>
      ) : (
        <Swiper
          slideWidth={WIDTH > iPhoneX ? 200 : 180}
          spaceBetween={50}
          paginationTop={true}
          centered={true}
          dotColor="#FFFFFF"
          dotWidth={WIDTH * 0.1}
          dotHeight={WIDTH * 0.02}
          paginationBottomSpace={WIDTH * 0.05}
          onIndexChange={() => {}}
        >
          {badges.map((item) => {
            if (item.badgeId === "independent") {
              const { timeStr, label } = getEndingIn(
                weekParams?.roundId,
                weekParams?.roundEndUnix,
                item.rounds
              );

              const { fpStr, fpTarget } = getIndependedKPI(
                game?.configuration?.kpis
              );
              const selectedSprintId = getSelectedSprintId(
                game?.configuration?.rounds,
                item.rounds
              );
              const { fps } = getCurrentTeamPts(coachRank, selectedSprintId);
              const unlockedHeight = getBadgeProgress(fpTarget, fps);

              return (
                <Pressable key={item.id} onPress={onStartGame}>
                  <NewBadge
                    colorOne="#0085E0"
                    colorTwo="#2C46C5"
                    textTopFirst={item.baseValue ? `INR ${item.baseValue}` : ""}
                    textTopSecond={timeStr}
                    textBottomFirst={item.baseValue ? `Badge value` : ""}
                    textBottomSecond={label}
                    isOverlay={unlockedHeight === 0 ? true : false}
                    unLockedHeight={unlockedHeight}
                    overlayText={fpStr}
                    athleteImage={item.athleteImage}
                  />
                </Pressable>
              );
            } else if (item.badgeId === "relative") {
              const { timeStr, label } = getEndingIn(
                weekParams?.roundId,
                weekParams?.roundEndUnix,
                item.rounds
              );

              return (
                <Pressable key={item.id} onPress={onStartGame}>
                  <NewBadgeGolden
                    key={item.id}
                    colorOne="#EADAA6"
                    colorTwo="#9C874E"
                    textTopFirst={item.baseValue ? `INR ${item.baseValue}` : ""}
                    textTopSecond={timeStr}
                    textBottomFirst={item.baseValue ? `Badge value` : ""}
                    textBottomSecond={label}
                    isOverlay={true}
                    overlayText="Get Rank 1 To Unlock"
                    textColor="#5C502F"
                    athleteImage={item.athleteImage}
                  />
                </Pressable>
              );
            } else {
              null;
            }
          })}
        </Swiper>
      )}
      {!params?.currentRound && params?.daysElapsed ? null : (
        <LinearGradient
          colors={["transparent", "#100F1A"]}
          className="px-4 py-0"
        >
          <Text
            style={{
              color:
                currentBadge?.badgeId === "independent" ? "#37CFFF" : "#FFF3B1",
              fontFamily: "BaiJamjuree-Bold",
            }}
            className={clsx(
              "text-[#37CFFF] text-xl font-bold leading-snug pb-7 pt-4 text-center "
            )}
          >
            {currentBadge?.name}
          </Text>

          <StartButton
            title="Start Workout"
            bgColor="bg-[#fff]"
            textColor="text-[#100F1A] "
            roundedStr="rounded-md"
            textStyle="py-2 text-center text-xl font-bold rounded-md"
            onPress={onStartGame}
          />
        </LinearGradient>
      )}
    </>
  );
};

export default BadgeScroll;
