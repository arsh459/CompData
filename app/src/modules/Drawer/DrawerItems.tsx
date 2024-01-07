import SvgIcons from "@components/SvgIcons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Linking, Text, View, TouchableOpacity } from "react-native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { waBaseLink } from "@constants/links";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

export type iconTypes =
  | "home"
  | "profile"
  | "contact"
  | "signout"
  | "prescription"
  | "medicalReportIcon";

export type drawerItemTypes = {
  name: string;
  item: iconTypes;
  subscriptionOnly: boolean;
  action: () => void;
};

interface Props {
  signedInUserId?: string;
  contentColor?: string;
}

const DrawerItems: React.FC<Props> = ({ signedInUserId, contentColor }) => {
  const { signOut } = useAuthContext();
  const navigation = useNavigation();
  const { subStatus } = useSubscriptionContext();

  const drawerItems: drawerItemTypes[] = [
    // {
    //   name: "Home",
    //   item: "home",
    //   action: () => navigation.goBack(),
    // },
    {
      name: "My Profile",
      item: "profile",
      subscriptionOnly: false,
      action: () => {
        signedInUserId &&
          navigation.navigate("User", { userId: signedInUserId });
        weEventTrack("drawer_clickProfile", {
          userId: signedInUserId ? signedInUserId : "",
        });
      },
    },
    {
      name: "My Prescription",
      item: "prescription",
      subscriptionOnly: true,
      action: () => {
        signedInUserId && navigation.navigate("PrescriptionsView");
      },
    },
    {
      name: "My Medical Reports",
      item: "medicalReportIcon",
      subscriptionOnly: true,
      action: () => {
        signedInUserId && navigation.navigate("MedicalReportScreen");
      },
    },
    {
      name: "Contact Us",
      item: "contact",
      subscriptionOnly: false,
      action: () => {
        Linking.openURL(
          `${waBaseLink}${encodeURI("Hi!\nI need some help with my account")}`
        );
        weEventTrack("drawer_clickContactUs", {});
      },
    },
    {
      name: "Sign Out",
      item: "signout",
      subscriptionOnly: false,
      action: () => {
        weEventTrack("drawer_clickSignOut", {});

        signOut && signOut();
        navigation.dispatch(DrawerActions.toggleDrawer());
      },
    },
  ];

  return (
    <View className="flex-1 flex flex-col px-2.5 iphoneX:px-4">
      {drawerItems.map((each) => {
        let visible: boolean = true;
        if (subStatus === "EXPIRED" && each.subscriptionOnly) {
          visible = false;
        }

        if (visible)
          return (
            <TouchableOpacity onPress={each.action} key={each.item}>
              <View className="w-full py-2  flex flex-row items-center">
                <View className="w-3 iphoneX:w-4 h-3 iphoneX:h-4">
                  <SvgIcons iconType={each.item} color={contentColor} />
                </View>
                <Text
                  className="flex-1 text-left text-sm iphoneX:text-lg capitalize mx-2.5 iphoneX:mx-4"
                  style={{ color: contentColor }}
                >
                  {each.name}
                </Text>
                <View className="w-1.5 iphoneX:w-2.5 h-1.5 iphoneX:h-2.5">
                  <ArrowIcon color={contentColor ? contentColor : "#100F1A"} />
                </View>
              </View>
            </TouchableOpacity>
          );
      })}
    </View>
  );
};

export default DrawerItems;
