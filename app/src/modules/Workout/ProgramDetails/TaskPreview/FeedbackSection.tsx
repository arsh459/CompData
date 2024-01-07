import { View, Text } from "react-native";

import clsx from "clsx";

import { useLeaderboard } from "@hooks/user/useLeaderboard";

import UserImage from "@components/UserImage";
import { LinearGradient } from "expo-linear-gradient";
// import TaskPoints from "@modules/Workout/ProgramHome/TaskCards/TaskPoints";
import GradientText from "@components/GradientText";
import { getScore, getUserScoreStringV2 } from "@utils/community/utils";

interface Props {
  taskName?: string;
  uid?: string;
  fitPoints?: number;
  earnedFP?: number;

  hideAuthor?: boolean;

  feedback?: string;
}

const FeedbackSection: React.FC<Props> = ({
  taskName,
  uid,
  fitPoints,

  hideAuthor,

  feedback,
  earnedFP,
}) => {
  const { leader } = useLeaderboard(uid);

  return (
    <LinearGradient
      colors={["transparent", "#100F1A"]}
      className={clsx("   text-white ")}
    >
      <View className="px-4">
        <Text
          className="text-xl iphoneX:text-2xl   text-left px-4 pb-4  text-white"
          numberOfLines={2}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {taskName}
        </Text>
        <LinearGradient
          colors={["#1C3640", "#232640"]}
          className={clsx(
            "py-4 px-5 rounded-2xl  text-white border-px border-[#FFFFFF24] "
          )}
        >
          <View className="flex items-start">
            <GradientText
              text={"My AI Feedback"}
              colors={["#47FDFF", "#62B4FF", "#7A91FF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              textStyle={{
                fontFamily: "BaiJamjuree-SemiBold",
                fontSize: 16,
                textAlign: "left",
              }}
            />
          </View>

          <Text
            className="text-xs pt-2 text-[#C8C8C8]"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {feedback
              ? feedback
              : "Good job. For detailed feedback, reach out to the health coach"}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["#1C3640", "#232640"]}
          className={clsx(
            "py-3 mt-2 px-5 rounded-2xl flex-row justify-around  text-white border-px border-[#FFFFFF24] "
          )}
        >
          <View className="flex ">
            <Text
              className="text-xl text-white"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              {earnedFP ? earnedFP : 0}/{fitPoints}
            </Text>
            <Text
              className="text-xs text-[#C8C8C8]"
              style={{ fontFamily: "BaiJamjuree-Regular" }}
            >
              Fitpoints
            </Text>
          </View>
          <View className=" w-px bg-[#FFFFFF26]" />
          <Text
            className="text-base  pl-2 flex-1 max-w-[60%]  text-white"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            adjustsFontSizeToFit={true}
          >
            {getUserScoreStringV2(getScore(earnedFP, fitPoints))}
          </Text>
        </LinearGradient>
        {hideAuthor ? null : (
          <View className="flex flex-row  items-center">
            <UserImage
              name={leader?.name ? leader.name : "Coach"}
              image={leader?.profileImage}
              width="w-6"
              height="h-6"
            />
            <Text
              className="text-sm iphoneX:text-base font-medium pl-2 py-2 text-white"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {leader?.name ? leader.name : "Coach"}
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default FeedbackSection;
