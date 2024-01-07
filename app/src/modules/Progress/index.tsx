import CloseBtn from "@components/Buttons/CloseBtn";
import Swiper from "@components/Swiper";
import { useUserRank } from "@hooks/rank/useUserRank";
import Header from "@modules/Header";
import { getEndingIn } from "@modules/HomeScreen/BadgeScroll/utils";
import { getCurrentPlayerPts } from "@modules/HomeScreen/NewHome/utils";
import DetailCardV2 from "@modules/ProgressState/DetailCardV2";
import TaskActivityList from "@modules/ProgressState/TaskActivityList";
import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useSprintBadges } from "@providers/badges/hooks/useSprintBadges";
import { useGameContext } from "@providers/game/GameProvider";
import { useNavigation } from "@react-navigation/native";
import { getRank } from "@utils/rank/utils";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import ProgressBadgeCard from "./ProgressBadgeCard";

interface Props {
  sprintId: string;
  uid: string;
}

const UserProgressModule: React.FC<Props> = ({ uid, sprintId }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { weekParams, params, game } = useGameContext();
  const { badges } = useSprintBadges(game?.id, sprintId);
  const [selectedIndex, setselectedIndex] = useState<number>(0);
  const { myUserRank: userRank } = useUserRank(game?.id, uid);
  const userData = getCurrentPlayerPts(userRank, sprintId);

  const { timeStr } = getEndingIn(
    weekParams?.roundId,
    weekParams?.roundEndUnix,
    params?.currentRound ? [params.currentRound.id] : []
  );

  const onClose = () => {
    navigation.goBack();
  };

  const onRankClick = (userId: string) => {
    navigation.navigate("User", { userId });
  };

  return (
    <>
      <Header headerColor="#100F1A" tone="dark" />

      <View className="flex-1 flex bg-[#100F1A]">
        <View className="flex flex-row items-center justify-between px-4 py-2">
          <View className="rounded-full flex flex-row items-center justify-between">
            <Text
              className="text-[#F4F4F4] text-xs iphoneX:text-sm"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Ending in <Text className="text-[#FF586F]">{timeStr}</Text>
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#EDEDED26]/20 rounded-full p-2"
            onPress={onClose}
          >
            <CloseBtn onClose={onClose} />
          </TouchableOpacity>
        </View>

        {/* <ScrollView bounces={false} className="flex-1"> */}
        <View className="py-2 ">
          <Swiper
            slideWidth={width}
            dotColor={
              badges[selectedIndex]?.textColor
                ? badges[selectedIndex].textColor
                : "#FFFFFF"
            }
            pagination={badges.length > 1}
            dotWidth={width * 0.15}
            dotHeight={width * 0.02}
            activeDotWidth={width * 0.1}
            onIndexChange={setselectedIndex}
          >
            {badges.map((item) => {
              return (
                <View key={item.id} className="w-full px-4">
                  <BadgeProgressProvider badgeId={item.id}>
                    <ProgressBadgeCard
                      badge={item}
                      rank={getRank(userRank, "overall", sprintId)}
                      earnFP={userData.fps}
                      nbWorkout={
                        userRank?.monthActPts &&
                        userRank.monthActPts[sprintId]?.length
                          ? userRank.monthActPts[sprintId]?.length
                          : 0
                      }
                    />
                  </BadgeProgressProvider>
                </View>
              );
            })}
          </Swiper>
        </View>

        {userRank ? (
          <View className="py-2 flex-1 bg-[#262630] rounded-xl m-4">
            <DetailCardV2
              userRank={userRank}
              isContribution={true}
              onPress={() => onRankClick(userRank.uid)}
              currentSprintId={sprintId}
            />

            {userRank.monthActPts && userRank.monthActPts[sprintId] ? (
              <>
                <TaskActivityList
                  activityList={userRank.monthActPts[sprintId]}
                />
              </>
            ) : (
              <View className="py-4 pb-8">
                <Text
                  className="text-[#D9D9D9] text-center text-lg"
                  style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                >
                  No workouts as of now
                </Text>
              </View>
            )}
          </View>
        ) : null}
        {/* </ScrollView> */}
      </View>
    </>
  );
};

export default UserProgressModule;
