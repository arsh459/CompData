import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AiScanItemsSelectionModule from "@modules/AiScanItemsSelectionModule";
import { useRoute } from "@react-navigation/native";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
export interface AiScanItemSelectionScreenParams {
  toBeSwaped: SwapItemParams;
}
const AiScanItemSelectionScreen = () => {
  const route = useRoute();
  const params = route.params as AiScanItemSelectionScreenParams;
  // console.log("AiScanItemSelectionScreen", params);
  useScreenTrack();
  return <AiScanItemsSelectionModule toBeSwaped={params.toBeSwaped} />;
};

export default AiScanItemSelectionScreen;
