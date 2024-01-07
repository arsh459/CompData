import { View, Image, Linking } from "react-native";

import GradientBgPopup from "@components/Popups/GradientBgPopup";
import { callUs, waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  visible: boolean;
  hidePopup: () => void;
}

const TalkToUsPopup: React.FC<Props> = ({ visible, hidePopup }) => {
  const onPressCTA = () => {
    hidePopup();
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI have some questions for the PRO plan")}`
    );
    weEventTrack("upgrade_clickChatPopup", {});
  };
  const onPressCTASecondary = () => {
    hidePopup();
    callUs();
    weEventTrack("upgrade_clickCallPopup", {});
  };

  return (
    <GradientBgPopup
      visible={visible}
      onClose={hidePopup}
      text="Questions? Talk to our health expert"
      ctaText="Chat"
      onPressCTA={onPressCTA}
      ctaTextSecondary="Call"
      onPressCTASecondary={onPressCTASecondary}
    >
      <View className="w-full aspect-[1.75] flex flex-row justify-center items-end overflow-hidden">
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,f-auto/Component_110__1__cZ-sNvYhqk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674119404639",
          }}
          className="absolute left-0 right-0 top-0 bottom-0"
        />
      </View>
    </GradientBgPopup>
  );
};

export default TalkToUsPopup;
