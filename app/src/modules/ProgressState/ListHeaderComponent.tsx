import Swiper from "@components/Swiper";
import { CoachRank } from "@models/Activity/Activity";
import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useSprintBadges } from "@providers/badges/hooks/useSprintBadges";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { getRank } from "@utils/rank/utils";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBadgeCard from "@modules/Progress/ProgressBadgeCard";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useState } from "react";
import { getCurrentTeamPts } from "@modules/HomeScreen/NewHome/utils";

interface Props {
  myTeam: boolean;
  coachRank?: CoachRank;
  sprintId: string;
}

const ListHeaderComponent: React.FC<Props> = ({
  myTeam,
  coachRank,
  sprintId,
}) => {
  const { team } = useTeamContext();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { game } = useGameContext();

  const { teamBadges } = useSprintBadges(game?.id, sprintId);
  const [selectedIndex, setselectedIndex] = useState<number>(0);
  const coachData = getCurrentTeamPts(coachRank, sprintId);

  return (
    <>
      <View className="py-2">
        <Swiper
          slideWidth={width}
          dotColor={
            teamBadges[selectedIndex]?.textColor
              ? teamBadges[selectedIndex].textColor
              : "#FFFFFF"
          }
          pagination={teamBadges.length > 1}
          dotWidth={width * 0.15}
          dotHeight={width * 0.02}
          activeDotWidth={width * 0.1}
          onIndexChange={setselectedIndex}
        >
          {teamBadges.map((item) => {
            return (
              <View key={item.id} className="w-full px-4">
                <BadgeProgressProvider badgeId={item.id}>
                  <ProgressBadgeCard
                    badge={item}
                    rank={getRank(coachRank, "overall", sprintId)}
                    earnFP={coachData.fps}
                    nbWorkout={
                      coachRank?.monthActPts &&
                      coachRank.monthActPts[sprintId].length
                        ? coachRank.monthActPts[sprintId]?.length
                        : 0
                    }
                  />
                </BadgeProgressProvider>
              </View>
            );
          })}
        </Swiper>
      </View>

      {coachRank ? (
        <View className="flex flex-row justify-between items-center p-4">
          <Text
            className="flex-1 text-base iphoneX:text-xl text-white"
            numberOfLines={1}
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {`#${getRank(coachRank, "overall", sprintId)} ${
              coachRank.teamName
                ? coachRank.teamName
                : `${coachRank.authorName}'s team`
            }`}
          </Text>
          <TouchableOpacity
            onPress={() =>
              team && navigation.navigate("TeamScreen", { teamId: team.id })
            }
          >
            <LinearGradient
              colors={["#B26971", "#955AA6", "#5973BC", "#498385"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="rounded-full px-4 py-1.5"
            >
              <Text
                className="text-white text-sm iphoneX:text-base"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                View Profile
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default ListHeaderComponent;
