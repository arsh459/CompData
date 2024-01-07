import { useState } from "react";
import SheduleAma from "./SheduleAma";
import Header from "@modules/Header";
import { Linking, View } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const SheduleAmaGatewayMain = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const openWhatsApp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI(
        "Hi!\nI have a question with the health coach"
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
        <View
          className="flex-1 flex items-center"
          style={{ marginTop: headerHeight }}
        >
          <SheduleAma />
        </View>
        <View className=" p-4">
          <StartButton
            title={"Ask Health Coach to check"}
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

export default SheduleAmaGatewayMain;
