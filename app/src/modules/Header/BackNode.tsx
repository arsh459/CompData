import { useNavigation, useRoute } from "@react-navigation/native";
import BackBtn from "@components/Buttons/BackBtn";
import { View } from "react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { ReactNode } from "react";
export type backIcon = "arrow" | "arrow_circle" | "arrow_filled";

interface Props {
  onBack?: () => void;
  tone?: "dark" | "light";
  backIcon?: backIcon;
  backIconColor?: string;
  backIconSvg?: ReactNode;
}

const BackNode: React.FC<Props> = ({
  onBack,
  tone,
  backIcon,
  backIconColor,
  backIconSvg,
}) => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View className="mr-3">
      <BackBtn
        backIconSvg={backIconSvg}
        icon={backIcon}
        classStr="w-6 iphoneX:w-8 h-6 iphoneX:h-8"
        color={
          backIconColor ? backIconColor : tone === "dark" ? "white" : "black"
        }
        onBack={() => {
          if (onBack) {
            onBack();
          } else if (navigation.canGoBack()) {
            navigation.goBack();
            weEventTrack("goBack", { screenName: route.name });
          }
        }}
      />
    </View>
  );
};

export default BackNode;
