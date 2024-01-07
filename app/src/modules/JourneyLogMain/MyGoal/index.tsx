import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Background from "./BackGround";
import { getFitnessGoal } from "@modules/SubscribedMain/utils";
import { getMyGoalObj } from "./utils";
import ArrowDirectionIcon from "@components/SvgIcons/ArrowDirectionIcon";
import ImageWithURL from "@components/ImageWithURL";
import CirclePercent from "@components/CirclePercent";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const MyGoal = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { myGoalObj, roadmapProgress } = useUserStore(({ user }) => {
    const prog =
      (user?.completedTargets ? user?.completedTargets : 0) /
      (user?.totalTargets ? user?.totalTargets : 1);

    return {
      myGoalObj: getMyGoalObj(getFitnessGoal(user?.fitnessGoal)),
      roadmapProgress: Math.round(prog * 100),
    };
  }, shallow);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MyGoalRoadmap");
        weEventTrack("journey_clickGoal", {});
      }}
      className="overflow-hidden rounded-xl m-4 relative z-0"
    >
      <Background color={myGoalObj.color} />

      <View className="absolute left-0 right-0 top-0 bottom-0 z-10 p-4 flex flex-row">
        <View className="flex-1 flex flex-row items-center">
          <ImageWithURL
            className="w-1/6 aspect-square mr-4"
            source={{ uri: myGoalObj.iconUrl }}
            resizeMode="contain"
          />
          <Text
            className="flex-1 text-xl iphoneX:text-3xl leading-none"
            style={{
              fontFamily: "Nunito-ExtraBold",
              color: myGoalObj.textColor,
            }}
          >
            {myGoalObj.title}
          </Text>
        </View>
        <View className="w-1/6 flex justify-between items-center">
          <View className="w-full aspect-[55/30] rounded-xl bg-white p-1.5">
            <ArrowDirectionIcon color={myGoalObj.textColor} />
          </View>
          <CirclePercent
            circleSize={width * 0.125}
            percent={roadmapProgress / 100 || 0}
            activeColor={myGoalObj.textColor}
            inActiveColor={`${myGoalObj.textColor}1e`}
            strokeWidth={5}
            padding={2}
            showInactive={true}
          >
            <Text
              style={{
                fontSize: width * 0.03,
                fontFamily: "Nunito-Regular",
                color: myGoalObj.textColor,
              }}
            >
              {`${roadmapProgress || 0}%`}
            </Text>
          </CirclePercent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyGoal;
