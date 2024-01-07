import { View, Text } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import SvgIcons from "@components/SvgIcons";
import JourneyLogMain from "@modules/JourneyLogMain";
import ViewSelectorV2 from "@components/ViewSelector/V2";
import AllAwards from "@modules/Awards/AllAwards";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const JourneyLogHome = () => {
  const [selectedView, setSelectedView] = useState<
    "My Progress" | "My Achievements"
  >("My Progress");

  useScreenTrack();

  return (
    <>
      <Header
        headerColor="#232136"
        tone="dark"
        titleNode={
          <View className="flex flex-row items-center">
            <View className="w-6 aspect-square">
              <SvgIcons iconType="progress" color="#FFFFFF" />
            </View>
            <Text
              className="pl-2.5 text-2xl pt-1 iphoneX:text-3xl text-white"
              style={{
                fontFamily: "Nunito-Bold",
              }}
            >
              My Progress
            </Text>
          </View>
        }
      />
      <View className="flex-1 bg-[#232136]">
        <ViewSelectorV2
          view1="My Progress"
          view2="My Achievements"
          currView={selectedView}
          onView1={() => {
            setSelectedView("My Progress");
            weEventTrack("journey_clickMyProgress", {});
          }}
          onView2={() => {
            setSelectedView("My Achievements");
            weEventTrack("journey_clickAwards", {});
          }}
          margin="m-4 mt-2"
          noIcon={true}
        />
        {selectedView === "My Progress" ? (
          <JourneyLogMain />
        ) : selectedView === "My Achievements" ? (
          <AllAwards />
        ) : null}
      </View>
    </>
  );
};

export default JourneyLogHome;
