import Header from "@modules/Header";
import { useState } from "react";
import ProfileList from "./ProfileList";
import BlockedContent from "./BlockedContent";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { isBlocked } from "./utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import HeaderOption from "./HeaderOption";
import ImageHeaderV4 from "./ImageHeader/V4";
import { View } from "react-native";
import ViewSelectorV3 from "@components/ViewSelector/V3";

const UserMain = () => {
  const [selectedView, setSelectedView] = useState<"History" | "Overview">(
    "Overview"
  );

  const { profile } = useProfileContext();
  const { isMe, blockedUIDs } = useUserStore(({ user }) => {
    return {
      isMe: user?.uid === profile?.uid,
      blockedUIDs: user?.blockedUIDs,
    };
  }, shallow);

  const handlePressView1 = () => {
    setSelectedView("Overview");
    weEventTrack("user_clickMyActivities", {});
  };

  const handlePressView2 = () => {
    setSelectedView("History");
    weEventTrack("user_clickMyBadges", {});
  };

  const ListHeaderComponent = () => {
    return (
      <View className="bg-[#343150] flex items-center justify-center">
        <ImageHeaderV4 />
        <ViewSelectorV3
          view1="Overview"
          view2="History"
          currView={selectedView}
          onView1={handlePressView1}
          onView2={handlePressView2}
        />
      </View>
    );
  };

  return (
    <>
      <Header
        back={true}
        title={`${isMe ? "My Profile" : ""} `}
        centerTitle={true}
        optionNode={<HeaderOption tone="dark" />}
        headerColor="#343150"
        tone="dark"
      />
      {isBlocked(blockedUIDs, profile?.uid) ? (
        <BlockedContent blockedUID={profile?.uid} />
      ) : (
        <ProfileList
          ListHeaderComponent={ListHeaderComponent}
          selectedView={selectedView}
        />
      )}
    </>
  );
};
export default UserMain;
