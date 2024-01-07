import { useState } from "react";
import Header from "@modules/Header";
import { Linking, ScrollView, View } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import DoctorSection from "./DoctorSection";

const DoctorConsult = () => {
  const [_, setHeaderHeight] = useState(0);

  const openWhatsApp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI(
        "Hi!\nI would like to schedule my consultation"
      )}`
    );

    weEventTrack("ScheduleCheckin_clickHealthCoach", {});
  };
  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        setHeaderHeight={setHeaderHeight}
      />
      <View className="flex-1 bg-[#232136]">
        <ScrollView
        //   className="flex-1 flex items-center"
        //   style={{ marginTop: headerHeight }}
        >
          <DoctorSection />
        </ScrollView>
        <View className=" p-4">
          <StartButton
            title={"Contact Us"}
            bgColor="bg-[#6D55D1]"
            textColor="text-white "
            roundedStr="rounded-2xl"
            textStyle="py-4 text-center text-sm iphoneX:text-base "
            fontFamily="Nunito-Bold"
            onPress={openWhatsApp}
          />
        </View>
      </View>
    </>
  );
};

export default DoctorConsult;
