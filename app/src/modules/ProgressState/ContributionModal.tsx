import CloseBtn from "@components/Buttons/CloseBtn";
import ProgressBar from "@components/ProgressBar";
import Swiper from "@components/Swiper";
import UseModal from "@components/UseModal";
import { badgeImage, maleStrength } from "@constants/imageKitURL";
// import { useCoachRank } from "@hooks/rank/useCoachRank";
// import { useUserRank } from "@hooks/rank/useUserRank";
// import { baseImageKit, fPointsWhite } from "@constants/imageKitURL";
import { UserRank } from "@models/Activity/Activity";
import { getIndependedKPI } from "@modules/HomeScreen/BadgeScroll/utils";
import {
  getCurrentPlayerPts,
  // getSelectedSprintId,
} from "@modules/HomeScreen/NewHome/utils";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
// import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { useSprintBadges } from "@providers/badges/hooks/useSprintBadges";
import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { getRank } from "@utils/rank/utils";

// import { TaskProvider } from "@providers/task/TaskProvider";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import DetailCard from "./DetailCard";
import IconImageFlex from "./IconImageFlex";
import TaskFPCard from "./TaskFPCard";
import TrophyNewCard from "./TrophyNewCard";

interface Props {
  visible: boolean;
  onClose: () => void;
  userRank: UserRank;
  currentSprintId?: string;
}

const ContributionModal: React.FC<Props> = ({
  visible,
  onClose,
  userRank,
  currentSprintId,
}) => {
  const { width } = useWindowDimensions();
  const { game, params } = useGameContext();
  // const {
  //   badges,
  //   // setSwipedBadge, swipedBadge
  // } = useBadgeContext();

  const { badges } = useSprintBadges(game?.id, currentSprintId);

  // const { teamLeader } = useTeamContext();
  // const { myUserRank } = useUserRank(selectedGameId, each);
  const rank = getRank(userRank, "overall", currentSprintId);

  const userData = getCurrentPlayerPts(userRank, currentSprintId);

  // const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);
  const navigation = useNavigation();
  const onRankClick = () => {
    navigation.navigate("User", { userId: userRank.uid });
  };

  return (
    <UseModal
      visible={visible}
      onClose={onClose}
      bgColor="bg-[#100F1A]"
      tone="dark"
      width="w-full"
      height="h-full"
    >
      <TouchableOpacity
        className="self-end bg-[#EDEDED26]/20 rounded-full p-3 mr-4"
        onPress={onClose}
      >
        <CloseBtn onClose={onClose} />
      </TouchableOpacity>

      <View className="  pt-2">
        <View className=" ">
          {badges.length ? (
            <View className="">
              <Swiper
                slideWidth={width - 32}
                spaceBetween={16}
                marginX={8}
                dotColor="#fff"
                pagination={badges.length > 1}
                // dotWidth={width * 0.15}
                // dotHeight={width * 0.02}
                // activeDotWidth={width * 0.1}
              >
                {badges.map((item) => {
                  const { fpTarget } = getIndependedKPI(
                    game?.configuration?.kpis
                  );
                  // const selectedSprintId = getSelectedSprintId(
                  //   game?.configuration?.rounds,
                  //   item.rounds
                  // );
                  // const { fps } = getCurrentTeamPts(
                  //   coachRank,
                  //   selectedSprintId

                  return (
                    <View
                      // style={{ width: WIDTH * 0.9 }}
                      key={item.id}
                      className=" "
                    >
                      <BadgeProgressProvider badgeId={item.id}>
                        <View>
                          {!item.isTeamBadge &&
                          typeof item.unlockFP === "number" ? (
                            <TrophyNewCard
                              imgUrl={badgeImage}
                              text={item.name}
                              subText={`Earn ${item.unlockFP} Fitpoints to unlock this badge`}
                              colorArr={["#ABFF6A26", "#CDFF6926"]}
                              textColor="#ABFF6A"
                              subTextColor="#ADCBA6"
                            >
                              <View className="flex-1  flex   px-4 py-2 ">
                                <View className="flex items-end pb-2 ">
                                  <IconImageFlex
                                    text={`${item.rankStart}/${item.unlockFP}`}
                                    iconColor="#ABFF6A"
                                    textColor="#ABFF6A"
                                    iconType="fitpoint"
                                  />
                                </View>
                                <View className="w-full">
                                  <ProgressBar
                                    height={1}
                                    progress={50}
                                    activeColor="#ABFF6A"
                                    inActiveColor="#ABFF6A17"
                                  />
                                </View>
                              </View>
                            </TrophyNewCard>
                          ) : (
                            <TrophyNewCard
                              imgUrl={maleStrength}
                              text={item.name}
                              subText="Complete All workouts and get Player Rank 1 to Earn this badge"
                              colorArr={["#C697F826", "#F099E326"]}
                              textColor="#FA82F0"
                              subTextColor="#C0A6CB"
                            >
                              <View className="flex-1  flex items-center  flex-row py-2 w-[90%]">
                                <IconImageFlex
                                  text={`Rank ${
                                    typeof rank === "number" ? rank : -1
                                  }`}
                                  iconColor="#FA82F0"
                                  textColor="#FA82F0"
                                  iconType="ranking"
                                />
                                <View className="pl-4">
                                  <IconImageFlex
                                    text={`${userData.nbWorkouts}/${fpTarget}`}
                                    iconColor="#FA82F0"
                                    textColor="#FA82F0"
                                    iconType="exercise"
                                  />
                                </View>
                              </View>
                            </TrophyNewCard>
                          )}
                        </View>
                      </BadgeProgressProvider>
                    </View>
                  );
                })}
              </Swiper>
            </View>
          ) : null}
        </View>
      </View>

      <View className="bg-white/10 rounded-xl m-4">
        <DetailCard
          userRank={userRank}
          isContribution={true}
          onPress={onRankClick}
        />
        <ScrollView
          bounces={true}
          // maintainVisibleContentPosition={true}
          contentContainerStyle={{ paddingBottom: 45 }}
        >
          {userRank.monthActPts &&
          params?.currentSprint?.id &&
          userRank.monthActPts[params?.currentSprint?.id] ? (
            userRank.monthActPts[params?.currentSprint?.id].map(
              ({ actId, uid }) => {
                return (
                  <View key={actId}>
                    <TaskFPCard actId={actId} uid={uid} />
                  </View>
                );
              }
            )
          ) : (
            <View className="py-4">
              <Text
                className="text-[#D9D9D9] text-center text-lg"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                No workouts as of now
              </Text>
            </View>
          )}
          {/* <View className="h-[160px]" /> */}
        </ScrollView>
      </View>
    </UseModal>
  );
};

export default ContributionModal;
