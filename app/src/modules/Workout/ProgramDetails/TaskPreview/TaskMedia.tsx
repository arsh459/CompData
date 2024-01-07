import { View, Text, Dimensions } from "react-native";
import { useState } from "react";
import clsx from "clsx";

import { useLeaderboard } from "@hooks/user/useLeaderboard";
import MediaCard from "@components/MediaCard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import UserImage from "@components/UserImage";
import {
  lvlIconWhite,
  springIconWhite,
  timerIconWhite,
} from "@constants/imageKitURL";
import { LinearGradient } from "expo-linear-gradient";
import TaskPoints from "@modules/Workout/ProgramHome/TaskCards/TaskPoints";
import GradientText from "@components/GradientText";
import { getScore, getUserScoreStringV2 } from "@utils/community/utils";
import { getFeedbackText } from "./utils";

const { height } = Dimensions.get("window");

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  thumbnails?: CloudinaryMedia | AWSMedia;
  taskName?: string;
  uid?: string;
  fitPoints?: number;
  earnedFP?: number;
  level?: number;
  taskDuration?: number;
  hideKPIs?: boolean;
  hideAuthor?: boolean;
  isFeedBack?: boolean;
  heightStyle?: string;
  feedback?: string;
  progressFP?: number;
}

const TaskMedia: React.FC<Props> = ({
  media,
  thumbnails,
  taskName,
  uid,
  fitPoints,
  taskDuration,
  level,
  hideAuthor,
  hideKPIs,
  isFeedBack,
  heightStyle,
  feedback,
  earnedFP,
  progressFP,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const { leader } = useLeaderboard(uid);

  return (
    <>
      <View
        className={clsx(
          "w-full  relative z-0 overflow-hidden",
          heightStyle ? heightStyle : "min-h-[15rem]"
        )}
      >
        {media ? (
          <View className="relative">
            <MediaCard
              media={media}
              thumbnail={thumbnails}
              maxHeight={height / 2}
              setIsPaused={setIsPaused}
            />
            <LinearGradient
              colors={["transparent", "#100F1A"]}
              className="absolute bottom-0 left-0 right-0 h-1/2"
            />
          </View>
        ) : null}

        {isFeedBack ? (
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
                    : getFeedbackText(progressFP, earnedFP, fitPoints)}
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
        ) : null}

        {isPaused ? (
          <LinearGradient
            colors={["transparent", "#100F1A"]}
            className={clsx(
              "absolute bottom-0 left-0 right-0 z-10   text-white "
            )}
          >
            {isFeedBack ? null : (
              <View className="px-4 pt-8 iphoneX:pt-12">
                <Text
                  className="text-xl iphoneX:text-2xl font-bold   text-white"
                  numberOfLines={2}
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                >
                  {taskName}
                </Text>
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
            )}
          </LinearGradient>
        ) : null}
      </View>
      {hideKPIs ? null : (
        <View className="flex flex-row justify-evenly  bg-[#FFFFFF29] m-4 py-0.5 rounded-lg">
          <TaskPoints
            text={`${taskDuration} min`}
            imageUrl={timerIconWhite}
            textStyle="text-sm iphoneX:text-base font-semibold"
            imgHWStr="w-3 h-4 aspect-squre"
          />
          <View className="w-px bg-[#0F0E19]" />
          <TaskPoints
            text={`${fitPoints ? fitPoints : 0} FP`}
            imageUrl={springIconWhite}
            textStyle="text-sm iphoneX:text-base font-semibold"
            imgHWStr="w-3 h-4 "
          />
          <View className="w-px bg-[#0F0E19]" />
          <TaskPoints
            text={`Lvl ${level ? level : 0}`}
            imageUrl={lvlIconWhite}
            textStyle="text-sm iphoneX:text-base font-semibold"
            imgHWStr="w-3 h-4 "
          />
        </View>
      )}
    </>
  );
};

export default TaskMedia;
