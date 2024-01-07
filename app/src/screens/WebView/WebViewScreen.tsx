import BackBtn from "@components/Buttons/BackBtn";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useNavigation, useRoute } from "@react-navigation/native";
import clsx from "clsx";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import WebView from "react-native-webview";

export interface WebviewParamsProps {
  source: string;
}

const WebViewScreen = ({}) => {
  const route = useRoute();
  const params = route.params as WebviewParamsProps;

  useScreenTrack(`WebView-${params.source}`);
  const navigation = useNavigation();

  // console.log("source", params.source);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        // backgroundColor="transparent"
        // translucent={true}
        animated={true}
      />
      <View
        className={clsx("px-2 py-2", Platform.OS === "android" ? "pt-8" : "")}
      >
        <BackBtn
          classStr="w-6 iphoneX:w-8 h-6 iphoneX:h-8"
          color="black"
          onBack={() => navigation.goBack()}
        />
      </View>
      <WebView style={{ flex: 1 }} source={{ uri: params.source }} />
    </SafeAreaView>
  );
};

export default WebViewScreen;
