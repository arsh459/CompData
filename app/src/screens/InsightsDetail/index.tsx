import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import InsightDetailMain from "@modules/InsightDetailMain";
import { useRoute } from "@react-navigation/native";

export interface InsightDetailProps {
  periodDateId: string;
  type: AutoRoomIDs;
}

const InsightDetail = () => {
  const route = useRoute();
  const params = route.params as InsightDetailProps;

  useScreenTrack();

  return <InsightDetailMain {...params} />;
};

export default InsightDetail;
