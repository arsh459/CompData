import clsx from "clsx";
import { View, Text, useWindowDimensions } from "react-native";
import ShowMore from "@components/ShowMore";
import { Post } from "@models/Post/Post";
import Swiper from "@components/Swiper";
import { useState } from "react";
import MediaCard from "@components/MediaCard";
import { Activity } from "@models/Activity/Activity";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import SvgIcons from "@components/SvgIcons";
import ViewResult from "@components/Buttons/ViewResult";

interface Props {
  post: Post;
  isPostScreen?: boolean;
  iButtonVisible?: boolean;
  fitPoints?: number;
  activityName?: string;
  activity?: Activity;
}

const CardMedia: React.FC<Props> = ({
  post,
  isPostScreen,
  iButtonVisible,
  fitPoints,
  activityName,
  activity,
}) => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <>
      {post.text ? (
        <View className="px-4 pb-2">
          <ShowMore
            text={post.text}
            textColor="text-[#ECE9FF]"
            textSize="text-base"
          />
        </View>
      ) : null}
      {post.media.length ? (
        <View className="relative z-0">
          <Swiper>
            {post.media.map((each) => (
              <MediaCard
                key={each.id}
                media={each}
                maxHeight={isPostScreen ? undefined : height * 0.6}
                mediaFit="contain"
                setIsPaused={setIsPaused}
              />
            ))}
          </Swiper>
          {activity &&
          !isPostScreen &&
          post.postType !== "announcement" &&
          isPaused ? (
            <>
              <LinearGradient
                colors={["black", "transparent"]}
                className={clsx(
                  "absolute top-0 left-0 right-0 z-10 h-1/4 min-h-max p-4",
                  "flex flex-row justify-start items-start pointer-events-none"
                )}
              >
                <Text
                  numberOfLines={1}
                  className="capitalize text-white text-base iphoneX:text-xl font-bold"
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                >
                  {activityName === "Post"
                    ? ""
                    : activityName === "Terra"
                    ? "Custom Workout"
                    : activityName}
                </Text>
              </LinearGradient>
            </>
          ) : null}
          {activity &&
          !isPostScreen &&
          post.postType !== "announcement" &&
          isPaused ? (
            <LinearGradient
              colors={["transparent", "black"]}
              className={clsx(
                "absolute bottom-0 left-0 right-0 h-1/4 min-h-max z-10 p-4",
                "flex flex-row justify-between items-end"
              )}
            >
              <View className="flex flex-row items-center">
                <View className="w-4 h-4 iphoneX:w-5 iphoneX:h-5">
                  <SvgIcons iconType="fitpoint" color="#FFFFFF" />
                </View>
                <Text
                  className="text-white text-base iphoneX:text-xl font-bold pl-2"
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                >
                  {!iButtonVisible ? "-" : `${fitPoints} FP`}
                </Text>
              </View>
              {iButtonVisible ? (
                <ViewResult
                  text="View Results"
                  onPress={() => {
                    navigation.navigate("PostDetails", {
                      gameId: post.gameId ? post.gameId : "",
                      teamId: post.eventId ? post.eventId : "",
                      postId: post.id,
                    });
                  }}
                />
              ) : null}
            </LinearGradient>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default CardMedia;
