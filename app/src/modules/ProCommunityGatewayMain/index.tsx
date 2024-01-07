import ProGatewayWrapper from "./ProGatewayWrapper";
import { whatsAppIcon } from "@constants/imageKitURL";
import JoinTerms from "./JoinTerms";
import { Linking } from "react-native";
import { femaleWellnessBitly } from "@constants/links";

const ProCommunityGatewayMain = () => {
  const onPress = () => {
    Linking.openURL(femaleWellnessBitly);
  };

  return (
    <ProGatewayWrapper
      onPress={onPress}
      btnTitle="Join Community"
      icon={whatsAppIcon}
    >
      <JoinTerms />
    </ProGatewayWrapper>
  );
};

export default ProCommunityGatewayMain;
