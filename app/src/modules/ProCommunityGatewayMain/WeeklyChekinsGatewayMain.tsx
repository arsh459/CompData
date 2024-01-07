import ProGatewayWrapper from "./ProGatewayWrapper";
import { pauseIcon } from "@constants/imageKitURL";
import PauseOrAma from "./PauseOrAma";
import { pauseBreak } from "./utils";
import { Linking } from "react-native";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const WeeklyChekinsGatewayMain = () => {
  const onWA = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to know about Weekly Check-Ins")}`
    );
    weEventTrack("click_wa", {});
  };
  return (
    <ProGatewayWrapper onPress={onWA} btnTitle="Contact Us" icon={pauseIcon}>
      <PauseOrAma
        heading={pauseBreak.heading}
        list={pauseBreak.list}
        middleText={pauseBreak.middleText}
      />
    </ProGatewayWrapper>
  );
};

export default WeeklyChekinsGatewayMain;
