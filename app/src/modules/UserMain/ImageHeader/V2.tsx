import { Text, TouchableOpacity, View } from "react-native";
import UserImage from "@components/UserImage";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import ShowMore from "@components/ShowMore";
import ProgressBar from "@components/ProgressBar";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
// import { useMotivatedUsers } from "@hooks/user/useMotivatedUsers";
import SpreadColorBall from "@components/SpreadColorBall";
import { getLevelColorV4 } from "@utils/level/levelColor";
import { baseImageKit, fPointsBlackBold } from "@constants/imageKitURL";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import FitPointModal from "../FitPointModal";
import ProfileButton from "../ProfileButton";

const ImageHeaderV2 = () => {
  const { profile } = useProfileContext();
  const { user } = useUserContext();

  const isMe = profile?.uid === user?.uid;

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const userLevelData = getLevelColorV4(
    profile?.userLevelV2 ? profile.userLevelV2 : 0
  );

  const handleClickFP = () => {
    setIsOpen(true);
    weEventTrack("user_clickFitpoints", {});
  };

  const handleClickMotivate = () => {
    navigation.navigate("Motivate", {
      viewerId: profile?.uid ? profile.uid : "",
    });
  };

  return (
    <View className="flex items-center justify-center">
      <View className="w-[150%] aspect-square absolute bottom-[10%]">
        <SpreadColorBall
          color1={userLevelData.color}
          color2="#100F1A"
          opacity={0.6}
        />
      </View>
      <UserImage
        image={profile?.profileImage}
        name={profile?.name}
        height={"h-20"}
        width={"w-20"}
        color={userLevelData.color}
      />
      <Text className="text-lg iphoneX:text-2xl capitalize text-center text-white py-6">
        <Text style={{ fontFamily: "BaiJamjuree-Bold" }}>
          {profile?.name?.substring(0, profile?.name?.indexOf(" "))}
        </Text>{" "}
        <Text style={{ fontFamily: "BaiJamjuree-Regular" }}>
          {profile?.name?.substring(profile?.name?.indexOf(" ") + 1)}
        </Text>
      </Text>
      <View className="flex flex-row justify-center items-center px-12">
        <FitPointModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          fitPoints={getUserTotalFP(profile?.fpCredit, profile?.fpDebit)}
        />

        <TouchableOpacity
          onPress={handleClickFP}
          style={{ flex: 1, maxWidth: 150 }}
          disabled={!isMe}
        >
          <ProfileButton
            text={`${getUserTotalFP(profile?.fpCredit, profile?.fpDebit)} FP`}
            fontStyle="bg-gray-300 flex-1"
            showIcon={true}
            level={profile?.userLevelV2 ? profile.userLevelV2 : 0}
            textStyle="text-black text-sm font-bold"
            iconUrl={`${baseImageKit}/${fPointsBlackBold}`}
          />
        </TouchableOpacity>

        <View className="w-1 iphoneX:w-2" />
        {profile?.landingContent?.superWomanLeader || isMe ? (
          <TouchableOpacity onPress={handleClickMotivate} style={{ flex: 1 }}>
            <ProfileButton
              showIcon={true}
              // iconUrl={
              //   profile?.landingContent?.superWomanLeader
              //     ? `${baseImageKit}/Vector__19__R14ANrlF0.png`
              //     : `${baseImageKit}/Vector__23__2iKcX_K3z.png`
              // }
              iconUrl={
                profile?.landingContent?.superWomanLeader
                  ? "https://ik.imagekit.io/socialboat/Vector__26__5c5KYDs1r.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676973854707"
                  : "https://ik.imagekit.io/socialboat/Vector__27__o7oo0DvT6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676973909781"
              }
              // iconUrl={`${baseImageKit}/Vector__19__R14ANrlF0.png`}
              text={
                // isMe && superWomanLeader ? "View Insights" : isMe && superWomanLeader ? "SuperWoman" : ....

                profile?.landingContent?.superWomanLeader &&
                profile.gender === "female"
                  ? "SuperWoman"
                  : profile?.landingContent?.superWomanLeader &&
                    profile.gender !== "female"
                  ? "SuperHuman"
                  : isMe
                  ? "Join as Leader"
                  : ""
              }
              // textNumber={
              // isMe
              //   ? motivatedUsers.length
              //     ? motivatedUsers.length
              //     : undefined
              //   : 0
              // }
              fontStyle="bg-[#FF5970] flex-1 whitespace-nowrap"
              textStyle="text-white text-sm font-medium"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View className="px-12 py-6">
        <ShowMore text={profile?.bio} numChars={35} textColor="text-white" />
      </View>

      <View className="w-full px-12 pb-6">
        <ProgressBar
          activeColor={userLevelData.color}
          progress={
            profile?.progressV2 ? Math.floor(profile.progressV2 * 100) : 0
          }
          inActiveColor="#474747AB"
          borderWidth={1}
          borderColor="#474747AB"
          height={7}
        />
        <View className="flex flex-row text-white  justify-between pt-0.5 iphoneX:pt-1">
          <Text
            style={{ fontFamily: "BaiJamjuree-Regular" }}
            className="text-white text-xs"
          >
            Lvl {profile?.userLevelV2}{" "}
          </Text>
          <Text
            style={{ fontFamily: "BaiJamjuree-Regular" }}
            className="flex flex-row items-center text-xs"
          >
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="flex-1 pr-2 text-xs text-white"
            >
              {isMe ? "You are" : "User is"} {userLevelData.aspirant}
            </Text>
            {/* <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Group__1__VDhq-xMdE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660642354287",
              }}
              className="w-2.5 h-2.5 object-contain ml-1"
            /> */}
          </Text>
          <Text
            style={{ fontFamily: "BaiJamjuree-Regular" }}
            className="text-white text-xs"
          >
            {profile?.userLevelV2 && profile?.userLevelV2 < 5
              ? `Lvl ${profile?.userLevelV2 + 1}`
              : !profile?.userLevelV2
              ? `Lvl 1`
              : ""}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ImageHeaderV2;
