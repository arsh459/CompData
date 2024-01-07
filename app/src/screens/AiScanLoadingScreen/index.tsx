import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AiScanLoadingModule from "@modules/AiScanLoadingModule";
import { useRoute } from "@react-navigation/native";
import { AiScanItemSelectionScreenParams } from "@screens/AiScanItemsSelectionScreen";

const AiScanLoadingScreen = () => {
  const route = useRoute();
  useScreenTrack();

  const params = route.params as AiScanItemSelectionScreenParams;
  // console.log("AiScanLoadingScreenParams", params);

  return <AiScanLoadingModule toBeSwaped={params.toBeSwaped} />;
};
export default AiScanLoadingScreen;
