import { Text, TouchableOpacity, View } from "react-native";
import UserImage from "@components/UserImage";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import ShowMore from "@components/ShowMore";
import { useNavigation } from "@react-navigation/native";
import { getLevelColorV4 } from "@utils/level/levelColor";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import SvgIcons from "@components/SvgIcons";
import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
import { useLevel } from "@hooks/level/useLevel";

const ImageHeaderV4 = () => {
  const { profile } = useProfileContext();
  const isMe = useUserStore(({ user }) => user?.uid === profile?.uid, shallow);
  const navigation = useNavigation();
  const userLevel = profile?.userLevelV2 || 0;
  const { level } = useLevel(userLevel);
  const userLevelData = getLevelColorV4(userLevel);

  const handlePlusClick = () => {
    navigation.navigate("EditUserProfile");
    weEventTrack("user_clickPlusICon", {});
  };

  const handleClickFP = () => {
    navigation.navigate("FitPointExpanderScreen");
    weEventTrack("user_clickFitpoints", {});
  };

  const handleClickLvl = () => {
    navigation.navigate("LevelDetailScreen", {
      lvlNumber: profile?.userLevelV2 ? profile.userLevelV2 : 0,
    });
    weEventTrack("user_clickLevel", {});
  };

  return (
    <>
      <View className="flex flex-row items-center justify-center px-6 py-4">
        <View className="relative z-0 p-0.5 bg-white/50 rounded-full">
          <UserImage
            image={profile?.profileImage}
            name={profile?.name}
            height={"h-16"}
            width={"w-16"}
            color={userLevelData.color}
          />
          {isMe ? (
            <TouchableOpacity
              onPress={handlePlusClick}
              className="absolute right-0.5 bottom-0.5 w-4 aspect-square bg-[#0F9DFF] rounded-full p-1"
            >
              <SvgIcons iconType="plus" color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View className="flex-1 ml-6">
          <View>
            <Text
              numberOfLines={1}
              className="flex-1 text-lg iphoneX:text-2xl capitalize text-white"
              style={{
                fontFamily: "Nunito-Bold",
              }}
            >
              {profile?.name}
            </Text>
          </View>

          <View className="flex flex-row items-center mt-1">
            <TouchableOpacity
              onPress={handleClickFP}
              disabled={!isMe}
              className={clsx(
                "flex flex-row justify-between items-center",
                isMe && "bg-[#D3C8FF] rounded-[10px] px-4 py-1.5"
              )}
            >
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group%201838%20(1)_aVMBUSFeW.png?updatedAt=1694433820148",
                }}
                className="w-7 aspect-square -ml-2 -mb-2"
                resizeMode="contain"
              />

              <Text
                className="text-sm"
                style={{
                  fontFamily: "Nunito-Bold",
                  color: isMe ? "#694CE0" : "#D3C8FF",
                }}
              >{`${getUserTotalFP(
                profile?.fpCredit,
                profile?.fpDebit
              )} FP`}</Text>
            </TouchableOpacity>

            <View className="w-1 aspect-square bg-white/70 rounded-full mx-2.5" />

            <TouchableOpacity
              onPress={handleClickLvl}
              disabled={!isMe}
              className={clsx(
                "flex flex-row justify-center items-center",
                isMe && "border border-[#DFCB7F] rounded-full px-2"
              )}
              style={{ borderColor: level?.textColor || "#FFFFFF" }}
            >
              <View className="w-4 aspect-square mr-2">
                <SvgIcons
                  iconType="star"
                  color={level?.textColor || "#FFFFFF"}
                />
              </View>

              <Text
                className="text-sm iphoneX:text-base text-center"
                style={{
                  fontFamily: "Nunito-Regular",
                  color: level?.textColor || "#FFFFFF",
                }}
              >
                Lvl {userLevel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="w-full px-8 py-4">
        <ShowMore text={profile?.bio} numChars={35} textColor="text-white" />
      </View>
    </>
  );
};

export default ImageHeaderV4;
