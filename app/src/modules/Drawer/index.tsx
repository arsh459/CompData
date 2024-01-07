import SocialBoat from "@components/SocialBoat";
import UserProfile from "@components/UserProfile";
// import { sbLogo } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
// import { useActiveGames } from "@hooks/game/useActiveGames";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

import {
  // Image,

  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import DrawerItems from "./DrawerItems";
// import GameElement from "./GameElement";
import SocialMedia from "./SocialMedia";
import SubscriptionCTA from "./SubscriptionCTA";

interface Props {
  tone?: "dark" | "light";
}

const AppDrawer: React.FC<Props> = ({ tone }) => {
  const { user } = useUserContext();
  const { width } = useWindowDimensions();
  // const { games } = useActiveGames();

  const bgColor: string = tone === "dark" ? "#343150" : "#F3F6F8";
  const contentColor: string = tone === "dark" ? "#F3F6F8" : "#100F1A";

  const navigation = useNavigation();

  const onProfilePress = () => {
    user?.uid && navigation.navigate("User", { userId: user?.uid });
    weEventTrack("drawer_clickProfile", {});
  };

  return (
    <View
      className="flex-1 flex flex-col justify-between pt-20 pb-4"
      style={{ backgroundColor: bgColor }}
    >
      {/* <View
        className="flex-1 flex flex-col justify-start items-center p-0"
        // style={{ aspectRatio: 1.2 }}
      > */}
      {/* <View></View> */}
      <View>
        <TouchableOpacity onPress={onProfilePress}>
          <View className="flex flex-col items-center">
            <View className="pb-4">
              <UserProfile
                user={user}
                size={width > iPhoneX ? 120 : 80}
                strokeWidth={6}
                padding={6}
                fontSize={10}
              />
            </View>
            <Text
              className="w-max h-max text-center text-lg iphoneX:text-2xl font-semibold"
              style={{ color: contentColor }}
            >
              {user?.name}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <SubscriptionProvider> */}
        <SubscriptionCTA />
        {/* </SubscriptionProvider> */}
        {/* <GameElement /> */}
        <DrawerItems signedInUserId={user?.uid} contentColor={contentColor} />
      </View>
      <View>
        <SocialMedia contentColor={contentColor} />
        <View className="p-2.5 iphoneX:p-4">
          <SocialBoat textColor={contentColor} />
        </View>
      </View>
    </View>
  );
};

export default AppDrawer;
