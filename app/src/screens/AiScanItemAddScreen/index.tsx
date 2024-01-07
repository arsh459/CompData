import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AiScanItemAddModule from "@modules/AiScanItemAddModule";

const AiScanItemAddScreen = () => {
  useScreenTrack();
  return <AiScanItemAddModule />;
};

export default AiScanItemAddScreen;
