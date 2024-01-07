import BlurBG from "@components/BlurBG";
import { helpIconPng } from "@constants/imageKitURL";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, Image, Linking, View, TouchableOpacity } from "react-native";

interface Props {
  text?: string;
  icon?: string;
  noIcon?: boolean;
  onClick?: () => void;
}

const HelpBtn: React.FC<Props> = ({ icon, text, noIcon, onClick }) => {
  const onHelpPress = () => {
    if (onClick) {
      onClick();
    } else {
      weEventTrack("ProScreen_clickHelp", {});
      Linking.openURL(`${waBaseLink}${encodeURI("Hi!\nI need help")}`);
    }
  };

  return (
    <TouchableOpacity onPress={onHelpPress}>
      <View className="flex flex-row items-center justify-center border rounded-full overflow-hidden relative border-[#D1D1D1] px-3 iphoneX:px-4 py-1">
        <BlurBG
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          blurAmount={10}
          fallbackColor="#100F1A"
          blurType="dark"
        />
        {noIcon ? null : (
          <View className="pr-2">
            <Image
              source={{ uri: icon ? icon : helpIconPng }}
              className="w-2 iphoneX:w-3 h-2 iphoneX:h-3  "
              resizeMode="contain"
            />
          </View>
        )}
        <Text className="text-xs iphoneX:text-sm font-semibold text-[#D1D1D1]">
          {text ? text : "HELP"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default HelpBtn;
