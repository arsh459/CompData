import {
  View,
  // Pressable,
  Image,
  FlatList,
  // useWindowDimensions,
  Text,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import HeadingMotivated from "./HeadingMotivated";
// import SvgIcons from "@components/SvgIcons";
import MotivateCard from "./MotivateCard";
// import Header, { headerTypes } from "@modules/Header";
import { useUserContext } from "@providers/user/UserProvider";
import { useMotivatedUsers } from "@hooks/user/useMotivatedUsers";
import { UserInterface } from "@models/User/User";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { createTeamInviteLinkV2 } from "@utils/dynamicLinks/inviteLink";
import ProfileButton from "@modules/UserMain/ProfileButton";
import { shareWhite } from "@constants/imageKitURL";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation, useRoute } from "@react-navigation/native";
import { shareNatively } from "@components/ShareWrapper";

const { width } = Dimensions.get("window");
interface Props {
  // setTypeHeader: (val: headerTypes) => void;
}
const MotivateMain: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const { profile } = useProfileContext();
  const { motivatedUsers } = useMotivatedUsers(profile?.uid);
  // const { height } = useWindowDimensions();
  const isMe = profile?.uid === user?.uid;

  const navigation = useNavigation();
  const route = useRoute();

  const onGetLink = async () => {
    if (user?.uid) {
      const url = await createTeamInviteLinkV2(
        user?.uid,
        user?.userKey ? user.userKey : ""
      );

      shareNatively(url, route.name);
    }
  };

  const onWA = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI(
        "Hi!\nI want to know about SuperWoman Leadership Program"
      )}`
    );

    weEventTrack("motivateEarn_clickHelp", {});
  };

  const listHeader = (
    <>
      <View className="relative flex-1">
        <View className="relative">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Screenshot_2023-02-21_at_2.54_1_iDVm11hff.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676971952867",
              // uri: "https://ik.imagekit.io/socialboat/find-your-trainer-02_1_4XlM5vjwK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660653692047",
            }}
            style={{ width: width, aspectRatio: 375 / 247 }}
            // style={{ aspectRatio: 1 }}
          />
          <LinearGradient
            colors={["transparent", "#11101B"]}
            className="absolute top-2/3 left-0 right-0 bottom-0"
          />
        </View>

        {isMe ? (
          <View
          // colors={["transparent", "#11101B"]}
          // className="absolute -bottom-10 left-0 right-0"
          >
            <View className="px-4">
              <View className="p-2 py-0">
                <Text
                  className="text-xl iphoneX:text-3xl font-bold text-white"
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                >
                  {user?.landingContent?.superWomanLeader
                    ? "Welcome to the SuperWoman Program"
                    : "SuperWoman Leadership Program"}
                </Text>
                <Text
                  className="text-sm pt-4 text-[#DDDFF4]"
                  style={{ fontFamily: "BaiJamjuree-Regular" }}
                >
                  {user?.landingContent?.superWomanLeader
                    ? `Motivate Woman around you to lead a healthy life. To make it worth your time, you get ${
                        user.landingContent?.superWomanIncentive
                          ? `INR ${user.landingContent?.superWomanIncentive}`
                          : "an incentive"
                      } for each paid user.`
                    : "Become a SuperWoman Leader and earn upto INR 1,50,000/month by changing lives"}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
      {isMe && !user?.landingContent?.superWomanLeader ? (
        <View className="p-4">
          <TouchableOpacity onPress={onWA}>
            <ProfileButton
              fontStyle="bg-[#FF5970]  justify-start
            flex-1 flex-row justify-center  "
              text="Contact Us for Details"
              textStyle="text-sm px-4 iphoneX:text-lg font-bold text-center  text-white whitespace-nowrap"
              showIcon={true}
              iconUrl={shareWhite}
            />
          </TouchableOpacity>
        </View>
      ) : isMe && user?.landingContent?.superWomanLeader ? (
        <View className="p-4">
          <TouchableOpacity onPress={onGetLink}>
            <ProfileButton
              fontStyle="bg-[#FF5970]  justify-start
            flex-1 flex-row justify-center  "
              text="Share your Invite Page"
              textStyle="text-sm px-4 iphoneX:text-lg font-bold text-center  text-white whitespace-nowrap"
              showIcon={true}
              iconUrl={shareWhite}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {motivatedUsers.length ? (
        <HeadingMotivated
          firstHeading={`People ${isMe ? "you" : profile?.name} Motivated`}
          secondHeading={`${
            isMe ? "you" : profile?.name?.split(" ")?.[0]
          } Motivated`}
          numberOfMotivated={motivatedUsers.length}
        />
      ) : null}
    </>
  );
  function renderItem(item: UserInterface) {
    const onPress = () => {
      // @ts-ignore
      navigation.push("User", { userId: item.uid });
      weEventTrack("motivateEarn_clickUser", {});
    };
    return (
      <TouchableOpacity onPress={onPress}>
        <MotivateCard
          // isActive={true}
          uid={item.uid}
          userName={item.name}
          img={item.profileImage}
        />
      </TouchableOpacity>
    );
  }
  // const checkScroll = (yOffSet: number) => {
  //   if (yOffSet > height / 3) {
  //     setTypeHeader("solid");
  //   } else {
  //     setTypeHeader("transparent");
  //   }
  // };
  return (
    <>
      <FlatList
        data={motivatedUsers}
        className="flex-1 bg-[#11101B]"
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.uid}
        ListHeaderComponent={listHeader}
        // onScroll={(e) => checkScroll(e.nativeEvent.contentOffset.y)}
        bounces={false}
      />

      {/* <Header tone="light" headerColor="transparent" headerType="transparent" /> */}

      {/* <Pressable className="absolute top-3 left-3" onPress={() => {}}>
        <SvgIcons iconType="lefArrow" color="#fff" />
      </Pressable> */}
    </>
  );
};

export default MotivateMain;
