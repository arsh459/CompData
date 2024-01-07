import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import { StatusBar, View } from "react-native";
import WebView from "react-native-webview";
import { getCleanLink } from "@providers/dnLinks/hooks/handleLink";

export interface BlogParamsProps {
  source: string;
  name: string;
}

const BlogScreen = ({}) => {
  const route = useRoute();
  const params = route.params as BlogParamsProps;

  useScreenTrack(`BlogScreen-${params.name ? params.name : params.source}`);
  //   const navigation = useNavigation();
  const cleanSource = getCleanLink(params.source);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" animated={true} />
      <Header
        back={true}
        tone="dark"
        headerColor="transparent"
        headerType="transparent"
      />

      <WebView
        startInLoadingState={true}
        style={{ flex: 1 }}
        source={{ uri: cleanSource }}
      />
    </View>
  );
};

export default BlogScreen;
