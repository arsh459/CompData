import { LinearGradient } from "expo-linear-gradient";
import { Platform, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type headerTypes = "transparent" | "overlay" | "solid";

export const headerElevation: number = 1000;

interface Props {
  headerType?: headerTypes;
  headerColorRemote: string;
  headerHeightRemote: number;
}

const AbsoluteOverlay: React.FC<Props> = ({
  headerType,
  headerColorRemote,
  headerHeightRemote,
}) => {
  const { top: SafeAreaInsetsTop } = useSafeAreaInsets();

  return headerType ? (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: headerHeightRemote,
        elevation: headerElevation / 2,
        zIndex: headerElevation / 2,
      }}
    >
      <View
        style={{
          width: "100%",
          height: headerType
            ? Platform.OS === "android"
              ? StatusBar.currentHeight
              : SafeAreaInsetsTop
            : 0,
          backgroundColor:
            headerType === "transparent" ? "transparent" : headerColorRemote,
        }}
      />
      <LinearGradient
        colors={
          headerType === "transparent"
            ? ["transparent", "transparent"]
            : headerType === "overlay"
            ? [headerColorRemote, "transparent"]
            : [headerColorRemote, headerColorRemote]
        }
        style={{ flex: 1 }}
      />
    </View>
  ) : null;
};

export default AbsoluteOverlay;
