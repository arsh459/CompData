import ProGatewayWrapper from "./ProGatewayWrapper";
import PauseOrAma from "./PauseOrAma";
import { biWeeklyLive } from "./utils";
import { Linking } from "react-native";
import { waBaseLink } from "@constants/links";

const BiWeeklyLiveGatewayMain = () => {
  const onWA = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI(
        "Hi!\nI want to get the Zoom Link for the session"
      )}`
    );
  };
  return (
    <ProGatewayWrapper
      onPress={onWA}
      btnTitle="Get Zoom Link"
      icon={biWeeklyLive.mainIcon}
    >
      <PauseOrAma
        heading={biWeeklyLive.heading}
        list={biWeeklyLive.list}
        middleText={biWeeklyLive.middleText}
      />
    </ProGatewayWrapper>
  );
};

export default BiWeeklyLiveGatewayMain;
