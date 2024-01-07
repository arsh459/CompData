import { FlatList, Image, Text, View } from "react-native";
import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { useNavigation } from "@react-navigation/native";
import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Badge } from "@models/Prizes/Prizes";
import { LinearGradient } from "expo-linear-gradient";
import { exploreAllWorkoutsNew } from "@constants/imageKitURL";
import Loading from "@components/loading/Loading";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import ExplorePlanCardV2 from "../MyProgress/ExplorePlanCardV2";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  handleScroll?: (val: number) => void;
}

const BadgeScrollV2: React.FC<Props> = ({ handleScroll }) => {
  const navigation = useNavigation();
  const { badges, fetched } = useBadgeContext();

  const { start, nutritionStart, badgeConfig } = useUserStore((state) => {
    return {
      start: state.user?.recommendationConfig?.start,
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      badgeConfig: state.user?.recommendationConfig?.badgeConfig,
    };
  }, shallow);

  const onStartGame = (badgeId: string, badgeName?: string) => {
    navigation.navigate("CoursePageScreen", {
      badgeId,
      type: "workout",
    });

    weEventTrack("home_clickStartWorkout", {
      badgeId: badgeId ? badgeId : "no_badgeId",
      badgeName: badgeName ? badgeName : "no_badgeName",
    });
  };

  function renderItem({ item }: { item: Badge }) {
    const startedUnix = getStartTime(
      badgeConfig,
      item.id,
      "workout",
      start,
      nutritionStart

      // item.id
    );

    return (
      <BadgeProgressProvider badgeId={item.id}>
        <ExplorePlanCardV2
          onStart={() => onStartGame(item.id, item.name)}
          badge={item}
          btnTitle={startedUnix ? "Go To Plan" : "Select"}
        />
      </BadgeProgressProvider>
    );
  }

  const keyExtractor = (item: Badge) => item.id;

  return (
    <View className="flex-1 bg-[#100F1A]">
      {!fetched ? (
        <View className="flex justify-center items-center flex-1">
          <Loading width="w-12" height="h-12" />
        </View>
      ) : badges.length ? (
        <FlatList
          data={badges}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={(e) =>
            handleScroll && handleScroll(e.nativeEvent.contentOffset.y)
          }
          ItemSeparatorComponent={() => <View className="w-8 aspect-square" />}
          ListHeaderComponent={
            <LinearGradient
              colors={["#2CD3F8", "#3172F6", "#CE42FF"]}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
              className="w-full aspect-[1.8] mb-8 relative z-0 flex justify-end items-center"
            >
              <Image
                source={{ uri: exploreAllWorkoutsNew }}
                className="w-[65%] aspect-[223/152] "
                resizeMode="contain"
              />
              <Text
                className="absolute left-4 right-4 bottom-4 text-center text-white text-xl iphoneX:text-2xl"
                style={{ fontFamily: "Nunito-BoldItalic" }}
              >
                Explore All Workouts
              </Text>
            </LinearGradient>
          }
          ListFooterComponent={<View className="w-4 aspect-square" />}
          className="flex-1"
          bounces={false}
        />
      ) : (
        <View className="flex justify-center items-center flex-1">
          <Text className="text-white font-bold text-xl iphoneX:text-2xl">
            No workout found
          </Text>
        </View>
      )}
    </View>
  );
};

export default BadgeScrollV2;
