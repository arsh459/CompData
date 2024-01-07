import ImageWithURL from "@components/ImageWithURL";
import MediaTile from "@components/MediaCard/MediaTile";
import { LevelInterface } from "@models/Level/interface";
import { getLeagueText } from "@modules/ChallengesMain/components/LeagueSelector/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { View, Text, useWindowDimensions } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {
  level: LevelInterface;
  isLocked: boolean;
}

const Details: React.FC<Props> = ({ level, isLocked }) => {
  const { userLevel } = useUserStore((state) => {
    return {
      userLevel: state.user?.userLevelV2 ? state.user?.userLevelV2 : 1,
    };
  }, shallow);

  const unlockText = getLeagueText(level, userLevel);
  // const isLocked = true;

  const { width } = useWindowDimensions();
  return (
    <View
      className="flex justify-center items-center relative z-0"
      style={{ width }}
    >
      <View className="w-1/2 aspect-square relative z-0">
        <MediaTile
          media={isLocked ? level.lockedImg : level.earnedImg}
          fluid={true}
        />

        {/* {isLocked ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 flex flex-row justify-center items-center">
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Vector_vOehTbIYZ.png?updatedAt=1695454279471",
              }}
              className={"w-4 aspect-square mr-1"}
              resizeMode="contain"
            />
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Currently locked
            </Text>
          </View>
        ) : null} */}
      </View>

      <View className="py-5">
        <Text
          className="text-2xl iphoneX:text-3xl"
          style={{
            fontFamily: "Nunito-Bold",
            color: level.textColor || "#FFFFFF",
          }}
        >
          {level.title}
        </Text>
      </View>

      <View
        className="w-3/4 bg-black/25 rounded-xl px-4 py-3"
        style={{
          backgroundColor: "#00000059",
          //  isLocked ? "#00000059" : undefined
        }}
      >
        <>
          <Text
            className="text-[#F1F1F1] text-sm"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {isLocked ? "How to unlock" : "League unlocked"}
          </Text>

          <View className="w-full h-px bg-white/10 my-3" />
        </>

        <Text
          numberOfLines={5}
          className="text-white/75 text-xs"
          style={{ fontFamily: "Nunito-Light" }}
        >
          {unlockText}
        </Text>

        {userLevel === level.lvlNumber ? (
          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex flex-row items-center">
              <Text
                className="text-white/75 text-xs"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {`${isLocked ? `Min FP Needed:` : `Min FP Needed:`}`}
              </Text>
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group%201838%20(1)_aVMBUSFeW.png?updatedAt=1694433820148",
                }}
                className="w-5 aspect-square -mb-1 ml-2"
                resizeMode="contain"
              />
              <Text
                className="text-white/75 text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {level.minFP}
              </Text>
            </View>

            <View className="flex flex-row items-center">
              <Text
                className="text-white/75 text-xs pr-2"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {`Rank Needed:`}
              </Text>
              <Text
                className="text-white/75 text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {level.promotionCutoff}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Details;
