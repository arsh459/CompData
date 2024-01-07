import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header, { headerTypes } from "@modules/Header";
import BadgeScrollV2 from "@modules/HomeScreen/BadgeScroll/BadgeScrollV2";
import { BadgeProvider } from "@providers/badges/BadgeProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useState } from "react";
import { View } from "react-native";

const AllWorkouts = () => {
  useScreenTrack();
  const [headerType, setHeaderType] = useState<headerTypes>("transparent");

  const handleScroll = (contentOffsetY: number) => {
    if (setHeaderType) {
      if (contentOffsetY) {
        setHeaderType("overlay");
      } else {
        setHeaderType("transparent");
      }
    }
  };

  return (
    // <UserProvider>
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        headerType={headerType}
      />
      <View className="flex-1 bg-[#100F1A]">
        <BadgeProvider>
          <BadgeScrollV2 handleScroll={handleScroll} />
        </BadgeProvider>
      </View>
    </>
    // </UserProvider>
  );
};

export default AllWorkouts;
