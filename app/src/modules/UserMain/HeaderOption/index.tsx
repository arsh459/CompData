import SvgIcons from "@components/SvgIcons";
import ReportModal from "@modules/Community/Program/ProgramCard/ReportModal";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import DeleteUserModal from "./DeleteUserModal";
import MenuV2 from "@components/Menu/V2";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  tone?: "dark" | "light";
}

const HeaderOption: React.FC<Props> = ({ tone }) => {
  const { signOut } = useAuthContext();
  const { profile } = useProfileContext();
  const navigation = useNavigation();
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
  const onDeleteRequest = () => {
    setIsMenuVisible(false);
    setTimeout(() => {
      setDeleteOpen(true);
    }, 2000);
  };

  // console.log("isDeleteOpen", isDeleteOpen);
  const onDeleteClose = () => setDeleteOpen(false);
  const onClose = () => setReportOpen(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const { subStatus } = useSubscriptionContext();

  const isMe = useUserStore(({ user }) => user?.uid === profile?.uid, shallow);

  const handleReportOrBlockUser = () => {
    weEventTrack("user_clickReportOrBlockUser", { target: "User" });
    setIsMenuVisible(false);
    setTimeout(() => {
      setReportOpen(true);
    }, 2000);
  };

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
    weEventTrack("user_clickMenu", {});
  };

  const handleSignOut = () => {
    signOut();
    navigation.navigate("Home");
    weEventTrack("user_clickSignOut", {});
  };

  const handleEditProfile = () => {
    navigation.navigate("EditUserProfile");
    weEventTrack("user_clickEditProfile", {});
  };

  const onProClick = async () => {
    // Need to toggle it back
    if (subStatus !== "SUBSCRIBED") {
      navigation.navigate("ProScreen", {});
      weEventTrack("profile_subscribeClick", {});
    } else {
      navigation.navigate("UpgradeScreen");
      weEventTrack("profile_proClick", {});
    }
  };

  return (
    <>
      <ReportModal
        contentUID={profile?.uid}
        postId=""
        isOpen={reportOpen}
        onClose={onClose}
        target="User"
        screen="user"
        // action="report_block_user"
        // heading="Report this User"
        // ctaText="Report User"
      />
      <DeleteUserModal
        isOpen={isDeleteOpen}
        // isOpen={true}
        onClose={onDeleteClose}
      />
      {/* {profile ? (
        <ShareWrapper
          shareURL="https://socialboat.page.link/Game"
          classStr="w-5 aspect-squre"
        >
          <SvgIcons iconType="share" />
        </ShareWrapper>
      ) : null} */}
      {/* <View className="w-4" /> */}
      <MenuV2
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        menuItems={
          isMe
            ? [
                {
                  text:
                    subStatus !== "SUBSCRIBED"
                      ? "Get Subscription"
                      : "My Subscription",
                  callback: onProClick,
                  textStyle: "text-[#E4B734]",
                },
                { text: "edit profile", callback: handleEditProfile },
                { text: "sign out", callback: handleSignOut },
                {
                  text: "Delete Account",
                  callback: onDeleteRequest,
                  textStyle: "text-[#FF8C9C]",
                },
              ]
            : [
                {
                  text: "Report/Block User",
                  callback: handleReportOrBlockUser,
                },
                // { text: "sign out", callback: handleSignOut },
              ]
        }
        menuColor="bg-[#343150] rounded-xl"
        menuItemsColor="bg-transparent px-4 py-3"
        itemSeperatorColor="#FFFFFF1A"
        textStyle="capitalize text-center text-white"
        position="left-bottom"
        separate={true}
        gap={8}
        blurAmount={10}
        fallbackColor="#232136"
      >
        <TouchableOpacity
          onPress={handleMenuPress}
          className="w-6 aspect-square"
        >
          <SvgIcons iconType="menu" />
        </TouchableOpacity>
      </MenuV2>
    </>
  );
};

export default HeaderOption;
