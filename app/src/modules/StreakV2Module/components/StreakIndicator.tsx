import ImageWithURL from "@components/ImageWithURL";
import {
  redStopWatch,
  streakBrokenFilled,
  streakFire,
} from "@constants/imageKitURL";
import TabHolder from "@modules/HomeScreen/HomeHeaderV2/TabHolder";
import { useReconcileStreak } from "@providers/streakV2/hooks/useReconcileStreak";
import { useUpdateUserStreak } from "@providers/streakV2/hooks/useUpdateUserStreak";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { isAfterNoon } from "@providers/streakV2/utils/isAfternoon";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

const StreakIndicator = () => {
  const navigation = useNavigation();
  useUpdateUserStreak();
  useReconcileStreak();

  const { days, todayStreakStatus, streakStatus } = useStreakStore(
    (state) => ({
      // streak: state.streak,
      days: state.streak?.days,
      todayStreakStatus: state.getTodayStreakStatus(),
      streakStatus: state.streak?.streakStatus,
    }),
    shallow
  );

  // console.log("days", days);
  // console.log("streak", streak);

  const isAfterNoonFlag = isAfterNoon();

  const onClickHandler = () => {
    weEventTrack("HomeClickStreakIcon", {});
    if (days !== undefined) {
      weEventTrack("HomeViewStreak", {});
      navigation.navigate("StreakV2Screen");
    } else {
      weEventTrack("HomeStartStreak", {});
      navigation.navigate("StartStreakScreen");
    }
  };

  return (
    <View className="relative">
      <TabHolder
        text={`${days || 0}`}
        onClick={onClickHandler}
        img={streakStatus === "inactive" ? streakBrokenFilled : streakFire}
      />
      {isAfterNoonFlag &&
        todayStreakStatus &&
        todayStreakStatus === "active" && (
          <ImageWithURL
            className=" right-0 bottom-0 absolute w-4 h-4"
            resizeMode="contain"
            source={{ uri: redStopWatch }}
          />
        )}
    </View>
  );
};

export default StreakIndicator;
