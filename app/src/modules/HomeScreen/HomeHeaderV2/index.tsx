import NotifyBell from "@components/SvgIcons/NotifyBell";
import UserImage from "@components/UserImage";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import notifee from "@notifee/react-native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MyTeamRank from "./MyTeamRank";
import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { Text } from "react-native";
import StreakIndicator from "@modules/StreakV2Module/components/StreakIndicator";

const HomeHeaderV2 = () => {
  const navigation = useNavigation();
  const { state, signInRequest } = useAuthContext();
  const [notificationCount, setNotCount] = useState<number>(0);

  const { name, profileImage, notificationCountServer } = useUserStore(
    ({ user }) => {
      return {
        name: user?.name,
        profileImage: user?.profileImage,
        notificationCountServer: user?.unreadPushNotifications ? true : false,
      };
    },
    shallow
  );

  const onNotificationClick = () => {
    setNotCount(0);
    navigation.navigate("Notification");

    weEventTrack("home_clickNotification", {});
  };
  // const onSearchClick = () => {
  //   navigation.navigate("SearchScreens");
  //   weEventTrack("home_clickSearch", {});
  // };

  const onProfileClick = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());

    weEventTrack("home_clickProfile", {});
  };

  useEffect(() => {
    notifee.getBadgeCount().then((val) => setNotCount(val));
  }, []);

  return (
    <View className=" flex flex-row ">
      <MyTeamRank />
      <StreakIndicator />

      <View className="flex-1 flex flex-row justify-end items-center">
        <TouchableOpacity
          style={styles.shadow}
          onPress={onNotificationClick}
          className="w-8 iphoneX:w-9 aspect-square rounded-full"
        >
          <View className="p-1.5 iphoneX:p-2 rounded-full bg-[#343150] border border-[#343150]">
            <NotifyBell
              showDot={!!notificationCount || notificationCountServer}
            />
          </View>
        </TouchableOpacity>
        <View className="w-2 aspect-square" />
        {state.status === "SUCCESS" ? (
          <TouchableOpacity
            style={styles.shadow}
            onPress={onProfileClick}
            className="rounded-full"
          >
            <UserImage
              image={profileImage}
              name={name}
              width="w-8 iphoneX:w-9"
              height="h-8 iphoneX:h-9"
            />
          </TouchableOpacity>
        ) : (
          <Text
            className="text-[#ff735c] iphoneX:text-lg"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            onPress={() => signInRequest()}
          >
            Sign In
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#2C2C37",
    elevation: 5,
  },
});

export default HomeHeaderV2;
