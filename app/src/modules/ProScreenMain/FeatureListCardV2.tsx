import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  Linking,
} from "react-native";

import {
  notSelectedIcon,
  rightArrowBowIconWhiteFrame14,
  rightTickIcon,
} from "@constants/imageKitURL";
import clsx from "clsx";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
interface Props {
  iconImg: string;
  heading?: string;
  mainText?: string;
  headingColor?: string;
  highlightFirstItem?: boolean;
  showNoTick?: boolean;
}
const FeatureListCardV2: React.FC<Props> = ({
  heading,
  iconImg,
  mainText,
  headingColor,
  highlightFirstItem,
  showNoTick,
}) => {
  const { width } = useWindowDimensions();
  // const uriImg =
  //   !highlightFirstItem && showNoTick
  //     ? notSelectedIcon
  //     : highlightFirstItem
  //     ? rightArrowBowIconWhiteFrame14
  //     : rightTickIcon;
  function getImageUri(
    highlightFirstItem: boolean | undefined,
    showNoTick: boolean | undefined,
    notSelectedIcon: string,
    rightArrowBowIconWhiteFrame14: string,
    rightTickIcon: string
  ) {
    if (!highlightFirstItem && showNoTick) {
      return notSelectedIcon;
    } else if (highlightFirstItem) {
      return rightArrowBowIconWhiteFrame14;
    } else {
      return rightTickIcon;
    }
  }

  const uriImg = getImageUri(
    highlightFirstItem,
    showNoTick,
    notSelectedIcon,
    rightArrowBowIconWhiteFrame14,
    rightTickIcon
  );
  const openWhatsApp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to start my free consultation")}`
    );

    weEventTrack("ProScreen_clickBookConsultation", {});
  };
  return (
    <View className="flex-1 pb-2">
      <Pressable
        onPress={highlightFirstItem ? openWhatsApp : () => {}}
        className={clsx(
          "flex flex-row justify-center    items-center ",
          highlightFirstItem ? "rounded-xl px-3 mx-2   bg-[#FF3DB747]" : "px-4"
        )}
      >
        <View style={{ width: width * 0.112 }}>
          <Image
            source={{
              uri: iconImg,
            }}
            className="w-full aspect-square rounded-full"
          />
        </View>
        <View className="flex-1 pl-4 py-3 pr-2">
          {heading ? (
            <Text
              className={clsx(
                "text-xs iphoneX:text-sm pb-1.5",
                headingColor ? headingColor : "text-white"
              )}
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {heading}
            </Text>
          ) : null}
          {mainText ? (
            <Text
              className="text-xs text-[#FFFFFF]/70"
              style={{ fontFamily: "Nunito-Light" }}
            >
              {mainText}
            </Text>
          ) : null}
        </View>
        <View className="pl-2 ">
          <Image
            source={{ uri: uriImg }}
            className="w-4 iphoneX:w-6 aspect-square"
          />
        </View>
      </Pressable>
    </View>
  );
};

export default FeatureListCardV2;
