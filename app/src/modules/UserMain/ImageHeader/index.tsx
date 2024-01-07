// import { formatWithCommas } from "@utils/number";
import { getAspriant } from "@modules/UserMain/utils";
import { getLevelIcon } from "@utils/user/utils";
import { Image, Pressable, Text, View } from "react-native";
import UserImage from "@components/UserImage";
import { LinearGradient } from "expo-linear-gradient";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import ShowMore from "@components/ShowMore";
import CirclePercent from "@components/CirclePercent";
import { Dimensions } from "react-native";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";

const { width: WIDTH } = Dimensions.get("window");

interface Props {}

const ImageHeader: React.FC<Props> = ({}) => {
  const { profile } = useProfileContext();
  const progress = profile?.progressV2 ? profile.progressV2 : 0;
  const userLevelData = getAspriant(
    profile?.userLevelV2 ? profile.userLevelV2 : 0
  );

  return (
    <LinearGradient colors={["#E6E6F1", "#E6E6F1"]} className="p-4">
      <View className="flex flex-row">
        <View
          style={{ width: (WIDTH * 2) / 5 }}
          className="flex items-center px-2"
        >
          {/* <UserImage
            image={profile?.profileImage}
            name={profile?.name}
            height={"h-full"}
            width={"w-full"}
            color={userLevelData.colorPrimary}
          /> */}

          {/* <UserImage
            image={profile?.profileImage}
            name={profile?.name}
            height={"h-24"}
            width={"w-24"}
            color={userLevelData.colorPrimary}
          /> */}

          <CirclePercent
            circleSize={80}
            percent={progress > 1 ? 1 : progress < 0 ? 0 : progress}
            activeColor={userLevelData.colorPrimary}
            strokeWidth={3}
            padding={2}
          >
            <UserImage
              image={profile?.profileImage}
              name={profile?.name}
              height={"h-full"}
              width={"w-full"}
              color={userLevelData.colorPrimary}
            />
          </CirclePercent>
          <View className="flex flex-row flex-wrap justify-center opacity-[.76]  max-w-max p-2 ">
            <Text className="text-lg iphoneX:text-2xl capitalize text-center">
              {profile?.name}
            </Text>
          </View>
        </View>
        <View className="flex   justify-between items-center px-3  w-3/5">
          <LinearGradient
            className="flex  flex-row items-center px-2.5 py-1 rounded-lg"
            colors={[
              userLevelData.colorPrimary,
              userLevelData.colorAdditional,
              userLevelData.colorSecondary,
            ]}
            start={[0, 0.5]}
            end={[1, 0.5]}
          >
            <Pressable className="max-w-40 flex-1 h-14 flex flex-col justify-center items-center text-white rounded-lg ">
              <Text className="text-sm flex-1 leading-none text-white">
                Lvl {profile?.userLevelV2 ? profile.userLevelV2 : 0}
              </Text>
              <Text className=" text-lg flex-1 leading-none text-white">
                {userLevelData.aspirant}
              </Text>
            </Pressable>
          </LinearGradient>
          <View className="flex flex-row  justify-center items-center max-w-max   ">
            <Image
              className=" opacity-[.76] pb-0.5 w-6 h-6"
              source={{
                uri: getLevelIcon(
                  profile?.userLevelV2 ? profile.userLevelV2 : 0,
                  "w-20 "
                ),
              }}
            />
            <Text
              className="font-bold  text-3xl pl-2  "
              style={{ color: userLevelData.colorPrimary }}
            >
              {`${getUserTotalFP(profile?.fpCredit, profile?.fpDebit)} FP`}
            </Text>
          </View>
        </View>
      </View>
      <ShowMore text={profile?.bio} numChars={35} />
    </LinearGradient>
  );
};

export default ImageHeader;
